import { PrismaClient, type Prisma as PrismaType } from "@prisma/client";
export { type Prisma } from '@prisma/client'

const prisma = new PrismaClient();

type PaginateOptions = {
  limit: number;
  page: number;
  sort?: string;
  filter?: string;
  expand?: string;
}

type PrismaModel = {
  [k in "findMany" | "count"]: CallableFunction;
};

type PrismaQuery = {
  where: Record<string, unknown>;
};

export function getQuery(url: URL) {
  const OPERATORS: Record<string, string> = {
    '=': 'equals',
    '<': 'lt',
    '<=': 'lte',
    '>': 'gt',
    '>=': 'gte',
    '~': 'contains',
    '~=': 'startsWith',
    '=~': 'endsWith',
    '!=': 'not'
  }
  const parseFilterString = (text: string) => {
    const obj: any = {};
    const regex = /([\w.]+)\s*([=<>!~ ]+)\s*([\w'"!@#$%^&*().,-]+|\d+)/g;
    let match;
    while ((match = regex.exec(text))) {
      const key = match[1];
      const operator = OPERATORS[match[2]] || 'equals';
      let value: string | number | Date = match[3].replace(/'|"/g, '');

      const indexOfConnector = text.indexOf('|', match.index - 5);
      const connector = indexOfConnector > -1 && indexOfConnector < match.index ? 'OR' : 'AND';

      // check if format is date
      if (value.includes('-') && isNaN(Date.parse(value)) == false) {
        value = new Date(value);
      }
      // check if number
      if (!isNaN(value as any)) {
        value = Number(value)
      }

      if (!obj[connector]) {
        obj[connector] = {}
      }
      if (obj[connector][key]) {
        obj[connector][key][operator] = value;
      } else {
        obj[connector][key] = { [operator]: value };
      }
    }
    return obj;
  }

  const query = {
    limit: Number(url.searchParams.get('limit') || 10),
    page: Number(url.searchParams.get('page') || 1),
    sort: url.searchParams.get('sort') || '',
    filter: url.searchParams.get('filter') || '',
    expand: url.searchParams.get('expand') || '',
  }

  const orderBy = !query.sort ? {} :
    query.sort.split(',').map(key => ({
      [key.replace('-', '')]: key.includes('-') ? 'desc' : 'asc'
    }))

  const include = !query.expand ? null :
    query.expand.split(',').reduce((prev, key) => ({
      ...prev, [key.replace('-', '')]: (key.includes('-') ? false : true)
    }), {})

  const filter = {
    where: parseFilterString(query.filter),
    orderBy,
  }

  return {
    query,
    orderBy,
    filter,
    include
  }
}

async function paginate<T, A, O>(
  this: T,
  args: PrismaType.Exact<
    A,
    Omit<PrismaType.Args<T, "findMany">, "cursor" | "take" | "skip">
  >,
  opt: PaginateOptions
) {

  const query = (args ?? {}) as PrismaQuery;
  const model = this as PrismaModel;

  const paging = !opt.limit ? {} : {
    skip: (opt.page - 1) * opt.limit,
    take: opt.limit,
  }
  const [result, count] = await Promise.all([
    model.findMany({
      ...query,
      ...paging
    }),
    model.count({
      ...query,
      select: undefined,
      include: undefined,
      orderBy: {},
    }),
  ]);

  const pageCount = !opt.limit ? 1 : Math.ceil(count / opt.limit);
  const prevPage = opt.page > 1 ? opt.page - 1 : null;
  const nextPage = opt.page < pageCount ? opt.page + 1 : null;

  return [
    result,
    {
      ...opt,
      nextPage,
      prevPage,
      pageCount
    }
  ]
}


prisma.$use(async (params, next) => {
  const before = Date.now();

  // console.log(params)
  const result = await next(params)
    // .catch(e => {
    //   console.log(params, e);
    //   return []
    // });

  const after = Date.now();

  // logger.info({
  // 	params,
  // 	elapsed: after - before
  // });
  // logger.info(`Query ${params.model}.${params.action} took ${after - before}ms`);

  return result;
  // return JSON.parse(JSON.stringify(result));
});

export const db = prisma
  .$extends({
    model: {
      $allModels: {
        paginate
      }
    }
  })
