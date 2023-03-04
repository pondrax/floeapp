import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const CertificateScalarFieldEnumSchema = z.enum(['id','name','phone','nip','nik','email','jabatan','organisasiUnit','status','certificateStatus','notBeforeDate','notAfterDate','createdAt','updatedAt','unitId']);

export const CsirtCategoryScalarFieldEnumSchema = z.enum(['id','name','slug','createdAt','updatedAt']);

export const CsirtPostScalarFieldEnumSchema = z.enum(['id','title','slug','content','thumbnail','type','createdAt','updatedAt','categoryId','userId']);

export const DevicesScalarFieldEnumSchema = z.enum(['id','name','description','createdAt','updatedAt']);

export const FortigateScalarFieldEnumSchema = z.enum(['id','name','tag','path','description','createdAt','updatedAt']);

export const HelpdeskCategoryScalarFieldEnumSchema = z.enum(['id','name','description','createdAt','updatedAt']);

export const HelpdeskScalarFieldEnumSchema = z.enum(['id','subject','content','email','phone','slug','metadata','status','createdAt','updatedAt','categoryId','unitId']);

export const IndeksKamiCategoryScalarFieldEnumSchema = z.enum(['id','version','code','type','part','title','description','createdAt','updatedAt']);

export const IndeksKamiCriteriaScalarFieldEnumSchema = z.enum(['id','version','code','tag','category','require','name','createdAt','updatedAt']);

export const IndeksKamiDataScalarFieldEnumSchema = z.enum(['id','type','value','file','filename','description','category','code','part','step','createdAt','updatedAt','indeksId','templateId']);

export const IndeksKamiScalarFieldEnumSchema = z.enum(['id','version','scope','summaryAsesi','summaryAsesor','createdAt','updatedAt','categoryId','unitId','asesiId','asesorId']);

export const IndeksKamiTemplateScalarFieldEnumSchema = z.enum(['id','version','header','category','code','part','step','question','example','options','createdAt','updatedAt']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((v) => transformJsonNull(v));

export const RoleScalarFieldEnumSchema = z.enum(['id','name','description','permissions','createdAt','updatedAt']);

export const SiteAuditScalarFieldEnumSchema = z.enum(['id','screenshot','loadedTime','loadedSize','status','createdAt','updatedAt','siteId']);

export const SiteScalarFieldEnumSchema = z.enum(['id','url','ip','localIp','description','status','createdAt','updatedAt','scanAt','unitId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UnitScalarFieldEnumSchema = z.enum(['id','name','email','description','createdAt','updatedAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','position','avatar','phone','createdAt','updatedAt','roleId','unitId','devicesId']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().nullable(),
  position: z.string().nullable(),
  avatar: z.string().nullable(),
  phone: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
  roleId: z.string().nullable(),
  unitId: z.string().nullable(),
  devicesId: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ROLE SCHEMA
/////////////////////////////////////////

export const RoleSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  permissions: InputJsonValue,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
})

export type Role = z.infer<typeof RoleSchema>

/////////////////////////////////////////
// UNIT SCHEMA
/////////////////////////////////////////

export const UnitSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().nullable(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
})

export type Unit = z.infer<typeof UnitSchema>

/////////////////////////////////////////
// DEVICES SCHEMA
/////////////////////////////////////////

export const DevicesSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
})

export type Devices = z.infer<typeof DevicesSchema>

/////////////////////////////////////////
// SITE SCHEMA
/////////////////////////////////////////

export const SiteSchema = z.object({
  id: z.string().uuid(),
  url: z.string().nullable(),
  ip: z.string().nullable(),
  localIp: z.string().nullable(),
  description: z.string().nullable(),
  status: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  scanAt: z.coerce.date().nullable(),
  unitId: z.string().nullable(),
})

export type Site = z.infer<typeof SiteSchema>

/////////////////////////////////////////
// SITE AUDIT SCHEMA
/////////////////////////////////////////

export const SiteAuditSchema = z.object({
  id: z.string().uuid(),
  screenshot: z.string().nullable(),
  loadedTime: z.number().int(),
  loadedSize: z.number().int(),
  status: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  siteId: z.string(),
})

export type SiteAudit = z.infer<typeof SiteAuditSchema>

/////////////////////////////////////////
// CERTIFICATE SCHEMA
/////////////////////////////////////////

export const CertificateSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  phone: z.string().nullable(),
  nip: z.string().nullable(),
  nik: z.string().nullable(),
  email: z.string().nullable(),
  jabatan: z.string().nullable(),
  organisasiUnit: z.string().nullable(),
  status: z.string(),
  certificateStatus: z.string(),
  notBeforeDate: z.coerce.date().nullable(),
  notAfterDate: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  unitId: z.string().nullable(),
})

export type Certificate = z.infer<typeof CertificateSchema>

/////////////////////////////////////////
// FORTIGATE SCHEMA
/////////////////////////////////////////

export const FortigateSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  tag: z.string(),
  path: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Fortigate = z.infer<typeof FortigateSchema>

/////////////////////////////////////////
// CSIRT POST SCHEMA
/////////////////////////////////////////

export const CsirtPostSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  thumbnail: z.string().nullable(),
  type: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  categoryId: z.string().nullable(),
  userId: z.string().nullable(),
})

export type CsirtPost = z.infer<typeof CsirtPostSchema>

/////////////////////////////////////////
// CSIRT CATEGORY SCHEMA
/////////////////////////////////////////

export const CsirtCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type CsirtCategory = z.infer<typeof CsirtCategorySchema>

/////////////////////////////////////////
// HELPDESK SCHEMA
/////////////////////////////////////////

export const HelpdeskSchema = z.object({
  id: z.string().uuid(),
  subject: z.string(),
  content: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  slug: z.string().nullable(),
  metadata: NullableJsonValue.optional(),
  status: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  categoryId: z.string().nullable(),
  unitId: z.string(),
})

export type Helpdesk = z.infer<typeof HelpdeskSchema>

/////////////////////////////////////////
// HELPDESK CATEGORY SCHEMA
/////////////////////////////////////////

export const HelpdeskCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type HelpdeskCategory = z.infer<typeof HelpdeskCategorySchema>

/////////////////////////////////////////
// INDEKS KAMI SCHEMA
/////////////////////////////////////////

export const IndeksKamiSchema = z.object({
  id: z.string().uuid(),
  version: z.string(),
  scope: z.string(),
  summaryAsesi: NullableJsonValue.optional(),
  summaryAsesor: NullableJsonValue.optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  categoryId: z.string().nullable(),
  unitId: z.string().nullable(),
  asesiId: z.string(),
  asesorId: z.string().nullable(),
})

export type IndeksKami = z.infer<typeof IndeksKamiSchema>

/////////////////////////////////////////
// INDEKS KAMI CATEGORY SCHEMA
/////////////////////////////////////////

export const IndeksKamiCategorySchema = z.object({
  id: z.string().uuid(),
  version: z.string(),
  code: z.number(),
  type: z.string(),
  part: z.string(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type IndeksKamiCategory = z.infer<typeof IndeksKamiCategorySchema>

/////////////////////////////////////////
// INDEKS KAMI CRITERIA SCHEMA
/////////////////////////////////////////

export const IndeksKamiCriteriaSchema = z.object({
  id: z.string().uuid(),
  version: z.string(),
  code: z.number(),
  tag: z.string().nullable(),
  category: z.number().nullable(),
  require: NullableJsonValue.optional(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type IndeksKamiCriteria = z.infer<typeof IndeksKamiCriteriaSchema>

/////////////////////////////////////////
// INDEKS KAMI TEMPLATE SCHEMA
/////////////////////////////////////////

export const IndeksKamiTemplateSchema = z.object({
  id: z.string().uuid(),
  version: z.string(),
  header: z.string().nullable(),
  category: z.number(),
  code: z.string(),
  part: z.string().nullable(),
  step: z.number().int().nullable(),
  question: z.string(),
  example: z.string().nullable(),
  options: NullableJsonValue.optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type IndeksKamiTemplate = z.infer<typeof IndeksKamiTemplateSchema>

/////////////////////////////////////////
// INDEKS KAMI DATA SCHEMA
/////////////////////////////////////////

export const IndeksKamiDataSchema = z.object({
  id: z.string().uuid(),
  type: z.string(),
  value: z.number().int().nullable(),
  file: z.string().nullable(),
  filename: z.string().nullable(),
  description: z.string().nullable(),
  category: z.number(),
  code: z.string(),
  part: z.string().nullable(),
  step: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  indeksId: z.string().nullable(),
  templateId: z.string().nullable(),
})

export type IndeksKamiData = z.infer<typeof IndeksKamiDataSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
  unit: z.union([z.boolean(),z.lazy(() => UnitArgsSchema)]).optional(),
  Asesi: z.union([z.boolean(),z.lazy(() => IndeksKamiFindManyArgsSchema)]).optional(),
  Asesor: z.union([z.boolean(),z.lazy(() => IndeksKamiFindManyArgsSchema)]).optional(),
  Devices: z.union([z.boolean(),z.lazy(() => DevicesArgsSchema)]).optional(),
  CsirtPost: z.union([z.boolean(),z.lazy(() => CsirtPostFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  Asesi: z.boolean().optional(),
  Asesor: z.boolean().optional(),
  CsirtPost: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  position: z.boolean().optional(),
  avatar: z.boolean().optional(),
  phone: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  roleId: z.boolean().optional(),
  unitId: z.boolean().optional(),
  devicesId: z.boolean().optional(),
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
  unit: z.union([z.boolean(),z.lazy(() => UnitArgsSchema)]).optional(),
  Asesi: z.union([z.boolean(),z.lazy(() => IndeksKamiFindManyArgsSchema)]).optional(),
  Asesor: z.union([z.boolean(),z.lazy(() => IndeksKamiFindManyArgsSchema)]).optional(),
  Devices: z.union([z.boolean(),z.lazy(() => DevicesArgsSchema)]).optional(),
  CsirtPost: z.union([z.boolean(),z.lazy(() => CsirtPostFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROLE
//------------------------------------------------------

export const RoleIncludeSchema: z.ZodType<Prisma.RoleInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RoleArgsSchema: z.ZodType<Prisma.RoleArgs> = z.object({
  select: z.lazy(() => RoleSelectSchema).optional(),
  include: z.lazy(() => RoleIncludeSchema).optional(),
}).strict();

export const RoleCountOutputTypeArgsSchema: z.ZodType<Prisma.RoleCountOutputTypeArgs> = z.object({
  select: z.lazy(() => RoleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RoleCountOutputTypeSelectSchema: z.ZodType<Prisma.RoleCountOutputTypeSelect> = z.object({
  User: z.boolean().optional(),
}).strict();

export const RoleSelectSchema: z.ZodType<Prisma.RoleSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  permissions: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// UNIT
//------------------------------------------------------

export const UnitIncludeSchema: z.ZodType<Prisma.UnitInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  Site: z.union([z.boolean(),z.lazy(() => SiteFindManyArgsSchema)]).optional(),
  Certificate: z.union([z.boolean(),z.lazy(() => CertificateFindManyArgsSchema)]).optional(),
  Asesi: z.union([z.boolean(),z.lazy(() => IndeksKamiFindManyArgsSchema)]).optional(),
  Helpdesk: z.union([z.boolean(),z.lazy(() => HelpdeskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UnitCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UnitArgsSchema: z.ZodType<Prisma.UnitArgs> = z.object({
  select: z.lazy(() => UnitSelectSchema).optional(),
  include: z.lazy(() => UnitIncludeSchema).optional(),
}).strict();

export const UnitCountOutputTypeArgsSchema: z.ZodType<Prisma.UnitCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UnitCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UnitCountOutputTypeSelectSchema: z.ZodType<Prisma.UnitCountOutputTypeSelect> = z.object({
  User: z.boolean().optional(),
  Site: z.boolean().optional(),
  Certificate: z.boolean().optional(),
  Asesi: z.boolean().optional(),
  Helpdesk: z.boolean().optional(),
}).strict();

export const UnitSelectSchema: z.ZodType<Prisma.UnitSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  Site: z.union([z.boolean(),z.lazy(() => SiteFindManyArgsSchema)]).optional(),
  Certificate: z.union([z.boolean(),z.lazy(() => CertificateFindManyArgsSchema)]).optional(),
  Asesi: z.union([z.boolean(),z.lazy(() => IndeksKamiFindManyArgsSchema)]).optional(),
  Helpdesk: z.union([z.boolean(),z.lazy(() => HelpdeskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UnitCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DEVICES
//------------------------------------------------------

export const DevicesIncludeSchema: z.ZodType<Prisma.DevicesInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DevicesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DevicesArgsSchema: z.ZodType<Prisma.DevicesArgs> = z.object({
  select: z.lazy(() => DevicesSelectSchema).optional(),
  include: z.lazy(() => DevicesIncludeSchema).optional(),
}).strict();

export const DevicesCountOutputTypeArgsSchema: z.ZodType<Prisma.DevicesCountOutputTypeArgs> = z.object({
  select: z.lazy(() => DevicesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DevicesCountOutputTypeSelectSchema: z.ZodType<Prisma.DevicesCountOutputTypeSelect> = z.object({
  User: z.boolean().optional(),
}).strict();

export const DevicesSelectSchema: z.ZodType<Prisma.DevicesSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DevicesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SITE
//------------------------------------------------------

export const SiteIncludeSchema: z.ZodType<Prisma.SiteInclude> = z.object({
  siteAudit: z.union([z.boolean(),z.lazy(() => SiteAuditFindManyArgsSchema)]).optional(),
  unit: z.union([z.boolean(),z.lazy(() => UnitArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SiteCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const SiteArgsSchema: z.ZodType<Prisma.SiteArgs> = z.object({
  select: z.lazy(() => SiteSelectSchema).optional(),
  include: z.lazy(() => SiteIncludeSchema).optional(),
}).strict();

export const SiteCountOutputTypeArgsSchema: z.ZodType<Prisma.SiteCountOutputTypeArgs> = z.object({
  select: z.lazy(() => SiteCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SiteCountOutputTypeSelectSchema: z.ZodType<Prisma.SiteCountOutputTypeSelect> = z.object({
  siteAudit: z.boolean().optional(),
}).strict();

export const SiteSelectSchema: z.ZodType<Prisma.SiteSelect> = z.object({
  id: z.boolean().optional(),
  url: z.boolean().optional(),
  ip: z.boolean().optional(),
  localIp: z.boolean().optional(),
  description: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  scanAt: z.boolean().optional(),
  unitId: z.boolean().optional(),
  siteAudit: z.union([z.boolean(),z.lazy(() => SiteAuditFindManyArgsSchema)]).optional(),
  unit: z.union([z.boolean(),z.lazy(() => UnitArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SiteCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SITE AUDIT
//------------------------------------------------------

export const SiteAuditIncludeSchema: z.ZodType<Prisma.SiteAuditInclude> = z.object({
  site: z.union([z.boolean(),z.lazy(() => SiteArgsSchema)]).optional(),
}).strict()

export const SiteAuditArgsSchema: z.ZodType<Prisma.SiteAuditArgs> = z.object({
  select: z.lazy(() => SiteAuditSelectSchema).optional(),
  include: z.lazy(() => SiteAuditIncludeSchema).optional(),
}).strict();

export const SiteAuditSelectSchema: z.ZodType<Prisma.SiteAuditSelect> = z.object({
  id: z.boolean().optional(),
  screenshot: z.boolean().optional(),
  loadedTime: z.boolean().optional(),
  loadedSize: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  siteId: z.boolean().optional(),
  site: z.union([z.boolean(),z.lazy(() => SiteArgsSchema)]).optional(),
}).strict()

// CERTIFICATE
//------------------------------------------------------

export const CertificateIncludeSchema: z.ZodType<Prisma.CertificateInclude> = z.object({
  unit: z.union([z.boolean(),z.lazy(() => UnitArgsSchema)]).optional(),
}).strict()

export const CertificateArgsSchema: z.ZodType<Prisma.CertificateArgs> = z.object({
  select: z.lazy(() => CertificateSelectSchema).optional(),
  include: z.lazy(() => CertificateIncludeSchema).optional(),
}).strict();

export const CertificateSelectSchema: z.ZodType<Prisma.CertificateSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  phone: z.boolean().optional(),
  nip: z.boolean().optional(),
  nik: z.boolean().optional(),
  email: z.boolean().optional(),
  jabatan: z.boolean().optional(),
  organisasiUnit: z.boolean().optional(),
  status: z.boolean().optional(),
  certificateStatus: z.boolean().optional(),
  notBeforeDate: z.boolean().optional(),
  notAfterDate: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  unitId: z.boolean().optional(),
  unit: z.union([z.boolean(),z.lazy(() => UnitArgsSchema)]).optional(),
}).strict()

// FORTIGATE
//------------------------------------------------------

export const FortigateSelectSchema: z.ZodType<Prisma.FortigateSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  tag: z.boolean().optional(),
  path: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// CSIRT POST
//------------------------------------------------------

export const CsirtPostIncludeSchema: z.ZodType<Prisma.CsirtPostInclude> = z.object({
  category: z.union([z.boolean(),z.lazy(() => CsirtCategoryArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const CsirtPostArgsSchema: z.ZodType<Prisma.CsirtPostArgs> = z.object({
  select: z.lazy(() => CsirtPostSelectSchema).optional(),
  include: z.lazy(() => CsirtPostIncludeSchema).optional(),
}).strict();

export const CsirtPostSelectSchema: z.ZodType<Prisma.CsirtPostSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  slug: z.boolean().optional(),
  content: z.boolean().optional(),
  thumbnail: z.boolean().optional(),
  type: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  userId: z.boolean().optional(),
  category: z.union([z.boolean(),z.lazy(() => CsirtCategoryArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// CSIRT CATEGORY
//------------------------------------------------------

export const CsirtCategoryIncludeSchema: z.ZodType<Prisma.CsirtCategoryInclude> = z.object({
  csirt: z.union([z.boolean(),z.lazy(() => CsirtPostFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CsirtCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CsirtCategoryArgsSchema: z.ZodType<Prisma.CsirtCategoryArgs> = z.object({
  select: z.lazy(() => CsirtCategorySelectSchema).optional(),
  include: z.lazy(() => CsirtCategoryIncludeSchema).optional(),
}).strict();

export const CsirtCategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.CsirtCategoryCountOutputTypeArgs> = z.object({
  select: z.lazy(() => CsirtCategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CsirtCategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.CsirtCategoryCountOutputTypeSelect> = z.object({
  csirt: z.boolean().optional(),
}).strict();

export const CsirtCategorySelectSchema: z.ZodType<Prisma.CsirtCategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  csirt: z.union([z.boolean(),z.lazy(() => CsirtPostFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CsirtCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// HELPDESK
//------------------------------------------------------

export const HelpdeskIncludeSchema: z.ZodType<Prisma.HelpdeskInclude> = z.object({
  category: z.union([z.boolean(),z.lazy(() => HelpdeskCategoryArgsSchema)]).optional(),
  unit: z.union([z.boolean(),z.lazy(() => UnitArgsSchema)]).optional(),
}).strict()

export const HelpdeskArgsSchema: z.ZodType<Prisma.HelpdeskArgs> = z.object({
  select: z.lazy(() => HelpdeskSelectSchema).optional(),
  include: z.lazy(() => HelpdeskIncludeSchema).optional(),
}).strict();

export const HelpdeskSelectSchema: z.ZodType<Prisma.HelpdeskSelect> = z.object({
  id: z.boolean().optional(),
  subject: z.boolean().optional(),
  content: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  slug: z.boolean().optional(),
  metadata: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  unitId: z.boolean().optional(),
  category: z.union([z.boolean(),z.lazy(() => HelpdeskCategoryArgsSchema)]).optional(),
  unit: z.union([z.boolean(),z.lazy(() => UnitArgsSchema)]).optional(),
}).strict()

// HELPDESK CATEGORY
//------------------------------------------------------

export const HelpdeskCategoryIncludeSchema: z.ZodType<Prisma.HelpdeskCategoryInclude> = z.object({
  helpdesk: z.union([z.boolean(),z.lazy(() => HelpdeskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HelpdeskCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const HelpdeskCategoryArgsSchema: z.ZodType<Prisma.HelpdeskCategoryArgs> = z.object({
  select: z.lazy(() => HelpdeskCategorySelectSchema).optional(),
  include: z.lazy(() => HelpdeskCategoryIncludeSchema).optional(),
}).strict();

export const HelpdeskCategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.HelpdeskCategoryCountOutputTypeArgs> = z.object({
  select: z.lazy(() => HelpdeskCategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const HelpdeskCategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.HelpdeskCategoryCountOutputTypeSelect> = z.object({
  helpdesk: z.boolean().optional(),
}).strict();

export const HelpdeskCategorySelectSchema: z.ZodType<Prisma.HelpdeskCategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  helpdesk: z.union([z.boolean(),z.lazy(() => HelpdeskFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HelpdeskCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// INDEKS KAMI
//------------------------------------------------------

export const IndeksKamiIncludeSchema: z.ZodType<Prisma.IndeksKamiInclude> = z.object({
  category: z.union([z.boolean(),z.lazy(() => IndeksKamiCategoryArgsSchema)]).optional(),
  unit: z.union([z.boolean(),z.lazy(() => UnitArgsSchema)]).optional(),
  asesi: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  asesor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  result: z.union([z.boolean(),z.lazy(() => IndeksKamiDataFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IndeksKamiCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const IndeksKamiArgsSchema: z.ZodType<Prisma.IndeksKamiArgs> = z.object({
  select: z.lazy(() => IndeksKamiSelectSchema).optional(),
  include: z.lazy(() => IndeksKamiIncludeSchema).optional(),
}).strict();

export const IndeksKamiCountOutputTypeArgsSchema: z.ZodType<Prisma.IndeksKamiCountOutputTypeArgs> = z.object({
  select: z.lazy(() => IndeksKamiCountOutputTypeSelectSchema).nullish(),
}).strict();

export const IndeksKamiCountOutputTypeSelectSchema: z.ZodType<Prisma.IndeksKamiCountOutputTypeSelect> = z.object({
  result: z.boolean().optional(),
}).strict();

export const IndeksKamiSelectSchema: z.ZodType<Prisma.IndeksKamiSelect> = z.object({
  id: z.boolean().optional(),
  version: z.boolean().optional(),
  scope: z.boolean().optional(),
  summaryAsesi: z.boolean().optional(),
  summaryAsesor: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  unitId: z.boolean().optional(),
  asesiId: z.boolean().optional(),
  asesorId: z.boolean().optional(),
  category: z.union([z.boolean(),z.lazy(() => IndeksKamiCategoryArgsSchema)]).optional(),
  unit: z.union([z.boolean(),z.lazy(() => UnitArgsSchema)]).optional(),
  asesi: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  asesor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  result: z.union([z.boolean(),z.lazy(() => IndeksKamiDataFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IndeksKamiCountOutputTypeArgsSchema)]).optional(),
}).strict()

// INDEKS KAMI CATEGORY
//------------------------------------------------------

export const IndeksKamiCategoryIncludeSchema: z.ZodType<Prisma.IndeksKamiCategoryInclude> = z.object({
  IndeksKami: z.union([z.boolean(),z.lazy(() => IndeksKamiFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IndeksKamiCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const IndeksKamiCategoryArgsSchema: z.ZodType<Prisma.IndeksKamiCategoryArgs> = z.object({
  select: z.lazy(() => IndeksKamiCategorySelectSchema).optional(),
  include: z.lazy(() => IndeksKamiCategoryIncludeSchema).optional(),
}).strict();

export const IndeksKamiCategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.IndeksKamiCategoryCountOutputTypeArgs> = z.object({
  select: z.lazy(() => IndeksKamiCategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const IndeksKamiCategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.IndeksKamiCategoryCountOutputTypeSelect> = z.object({
  IndeksKami: z.boolean().optional(),
}).strict();

export const IndeksKamiCategorySelectSchema: z.ZodType<Prisma.IndeksKamiCategorySelect> = z.object({
  id: z.boolean().optional(),
  version: z.boolean().optional(),
  code: z.boolean().optional(),
  type: z.boolean().optional(),
  part: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  IndeksKami: z.union([z.boolean(),z.lazy(() => IndeksKamiFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IndeksKamiCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// INDEKS KAMI CRITERIA
//------------------------------------------------------

export const IndeksKamiCriteriaSelectSchema: z.ZodType<Prisma.IndeksKamiCriteriaSelect> = z.object({
  id: z.boolean().optional(),
  version: z.boolean().optional(),
  code: z.boolean().optional(),
  tag: z.boolean().optional(),
  category: z.boolean().optional(),
  require: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// INDEKS KAMI TEMPLATE
//------------------------------------------------------

export const IndeksKamiTemplateIncludeSchema: z.ZodType<Prisma.IndeksKamiTemplateInclude> = z.object({
  result: z.union([z.boolean(),z.lazy(() => IndeksKamiDataFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IndeksKamiTemplateCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const IndeksKamiTemplateArgsSchema: z.ZodType<Prisma.IndeksKamiTemplateArgs> = z.object({
  select: z.lazy(() => IndeksKamiTemplateSelectSchema).optional(),
  include: z.lazy(() => IndeksKamiTemplateIncludeSchema).optional(),
}).strict();

export const IndeksKamiTemplateCountOutputTypeArgsSchema: z.ZodType<Prisma.IndeksKamiTemplateCountOutputTypeArgs> = z.object({
  select: z.lazy(() => IndeksKamiTemplateCountOutputTypeSelectSchema).nullish(),
}).strict();

export const IndeksKamiTemplateCountOutputTypeSelectSchema: z.ZodType<Prisma.IndeksKamiTemplateCountOutputTypeSelect> = z.object({
  result: z.boolean().optional(),
}).strict();

export const IndeksKamiTemplateSelectSchema: z.ZodType<Prisma.IndeksKamiTemplateSelect> = z.object({
  id: z.boolean().optional(),
  version: z.boolean().optional(),
  header: z.boolean().optional(),
  category: z.boolean().optional(),
  code: z.boolean().optional(),
  part: z.boolean().optional(),
  step: z.boolean().optional(),
  question: z.boolean().optional(),
  example: z.boolean().optional(),
  options: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  result: z.union([z.boolean(),z.lazy(() => IndeksKamiDataFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => IndeksKamiTemplateCountOutputTypeArgsSchema)]).optional(),
}).strict()

// INDEKS KAMI DATA
//------------------------------------------------------

export const IndeksKamiDataIncludeSchema: z.ZodType<Prisma.IndeksKamiDataInclude> = z.object({
  IndeksKami: z.union([z.boolean(),z.lazy(() => IndeksKamiArgsSchema)]).optional(),
  template: z.union([z.boolean(),z.lazy(() => IndeksKamiTemplateArgsSchema)]).optional(),
}).strict()

export const IndeksKamiDataArgsSchema: z.ZodType<Prisma.IndeksKamiDataArgs> = z.object({
  select: z.lazy(() => IndeksKamiDataSelectSchema).optional(),
  include: z.lazy(() => IndeksKamiDataIncludeSchema).optional(),
}).strict();

export const IndeksKamiDataSelectSchema: z.ZodType<Prisma.IndeksKamiDataSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  value: z.boolean().optional(),
  file: z.boolean().optional(),
  filename: z.boolean().optional(),
  description: z.boolean().optional(),
  category: z.boolean().optional(),
  code: z.boolean().optional(),
  part: z.boolean().optional(),
  step: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  indeksId: z.boolean().optional(),
  templateId: z.boolean().optional(),
  IndeksKami: z.union([z.boolean(),z.lazy(() => IndeksKamiArgsSchema)]).optional(),
  template: z.union([z.boolean(),z.lazy(() => IndeksKamiTemplateArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  position: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  roleId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  unitId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  devicesId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => RoleRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional().nullable(),
  unit: z.union([ z.lazy(() => UnitRelationFilterSchema),z.lazy(() => UnitWhereInputSchema) ]).optional().nullable(),
  Asesi: z.lazy(() => IndeksKamiListRelationFilterSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiListRelationFilterSchema).optional(),
  Devices: z.union([ z.lazy(() => DevicesRelationFilterSchema),z.lazy(() => DevicesWhereInputSchema) ]).optional().nullable(),
  CsirtPost: z.lazy(() => CsirtPostListRelationFilterSchema).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  devicesId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => RoleOrderByWithRelationInputSchema).optional(),
  unit: z.lazy(() => UnitOrderByWithRelationInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiOrderByRelationAggregateInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiOrderByRelationAggregateInputSchema).optional(),
  Devices: z.lazy(() => DevicesOrderByWithRelationInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email().optional(),
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  devicesId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  position: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  roleId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  unitId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  devicesId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const RoleWhereInputSchema: z.ZodType<Prisma.RoleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  permissions: z.lazy(() => JsonFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  User: z.lazy(() => UserListRelationFilterSchema).optional(),
}).strict();

export const RoleOrderByWithRelationInputSchema: z.ZodType<Prisma.RoleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  permissions: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const RoleWhereUniqueInputSchema: z.ZodType<Prisma.RoleWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
}).strict();

export const RoleOrderByWithAggregationInputSchema: z.ZodType<Prisma.RoleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  permissions: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RoleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RoleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RoleMinOrderByAggregateInputSchema).optional(),
}).strict();

export const RoleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RoleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RoleScalarWhereWithAggregatesInputSchema),z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleScalarWhereWithAggregatesInputSchema),z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  permissions: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const UnitWhereInputSchema: z.ZodType<Prisma.UnitWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UnitWhereInputSchema),z.lazy(() => UnitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UnitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UnitWhereInputSchema),z.lazy(() => UnitWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  User: z.lazy(() => UserListRelationFilterSchema).optional(),
  Site: z.lazy(() => SiteListRelationFilterSchema).optional(),
  Certificate: z.lazy(() => CertificateListRelationFilterSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiListRelationFilterSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskListRelationFilterSchema).optional(),
}).strict();

export const UnitOrderByWithRelationInputSchema: z.ZodType<Prisma.UnitOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  Site: z.lazy(() => SiteOrderByRelationAggregateInputSchema).optional(),
  Certificate: z.lazy(() => CertificateOrderByRelationAggregateInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiOrderByRelationAggregateInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const UnitWhereUniqueInputSchema: z.ZodType<Prisma.UnitWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
}).strict();

export const UnitOrderByWithAggregationInputSchema: z.ZodType<Prisma.UnitOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UnitCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UnitMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UnitMinOrderByAggregateInputSchema).optional(),
}).strict();

export const UnitScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UnitScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UnitScalarWhereWithAggregatesInputSchema),z.lazy(() => UnitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UnitScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UnitScalarWhereWithAggregatesInputSchema),z.lazy(() => UnitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const DevicesWhereInputSchema: z.ZodType<Prisma.DevicesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DevicesWhereInputSchema),z.lazy(() => DevicesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DevicesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DevicesWhereInputSchema),z.lazy(() => DevicesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  User: z.lazy(() => UserListRelationFilterSchema).optional(),
}).strict();

export const DevicesOrderByWithRelationInputSchema: z.ZodType<Prisma.DevicesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const DevicesWhereUniqueInputSchema: z.ZodType<Prisma.DevicesWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
}).strict();

export const DevicesOrderByWithAggregationInputSchema: z.ZodType<Prisma.DevicesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DevicesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DevicesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DevicesMinOrderByAggregateInputSchema).optional(),
}).strict();

export const DevicesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DevicesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DevicesScalarWhereWithAggregatesInputSchema),z.lazy(() => DevicesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DevicesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DevicesScalarWhereWithAggregatesInputSchema),z.lazy(() => DevicesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const SiteWhereInputSchema: z.ZodType<Prisma.SiteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SiteWhereInputSchema),z.lazy(() => SiteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SiteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SiteWhereInputSchema),z.lazy(() => SiteWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ip: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  localIp: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  scanAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  unitId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  siteAudit: z.lazy(() => SiteAuditListRelationFilterSchema).optional(),
  unit: z.union([ z.lazy(() => UnitRelationFilterSchema),z.lazy(() => UnitWhereInputSchema) ]).optional().nullable(),
}).strict();

export const SiteOrderByWithRelationInputSchema: z.ZodType<Prisma.SiteOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  ip: z.lazy(() => SortOrderSchema).optional(),
  localIp: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  scanAt: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  siteAudit: z.lazy(() => SiteAuditOrderByRelationAggregateInputSchema).optional(),
  unit: z.lazy(() => UnitOrderByWithRelationInputSchema).optional(),
}).strict();

export const SiteWhereUniqueInputSchema: z.ZodType<Prisma.SiteWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  url: z.string().optional(),
}).strict();

export const SiteOrderByWithAggregationInputSchema: z.ZodType<Prisma.SiteOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  ip: z.lazy(() => SortOrderSchema).optional(),
  localIp: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  scanAt: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SiteCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SiteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SiteMinOrderByAggregateInputSchema).optional(),
}).strict();

export const SiteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SiteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SiteScalarWhereWithAggregatesInputSchema),z.lazy(() => SiteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SiteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SiteScalarWhereWithAggregatesInputSchema),z.lazy(() => SiteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ip: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  localIp: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  scanAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  unitId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SiteAuditWhereInputSchema: z.ZodType<Prisma.SiteAuditWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SiteAuditWhereInputSchema),z.lazy(() => SiteAuditWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SiteAuditWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SiteAuditWhereInputSchema),z.lazy(() => SiteAuditWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  screenshot: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  loadedTime: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  loadedSize: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  siteId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  site: z.union([ z.lazy(() => SiteRelationFilterSchema),z.lazy(() => SiteWhereInputSchema) ]).optional(),
}).strict();

export const SiteAuditOrderByWithRelationInputSchema: z.ZodType<Prisma.SiteAuditOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  screenshot: z.lazy(() => SortOrderSchema).optional(),
  loadedTime: z.lazy(() => SortOrderSchema).optional(),
  loadedSize: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  siteId: z.lazy(() => SortOrderSchema).optional(),
  site: z.lazy(() => SiteOrderByWithRelationInputSchema).optional(),
}).strict();

export const SiteAuditWhereUniqueInputSchema: z.ZodType<Prisma.SiteAuditWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
}).strict();

export const SiteAuditOrderByWithAggregationInputSchema: z.ZodType<Prisma.SiteAuditOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  screenshot: z.lazy(() => SortOrderSchema).optional(),
  loadedTime: z.lazy(() => SortOrderSchema).optional(),
  loadedSize: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  siteId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SiteAuditCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SiteAuditAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SiteAuditMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SiteAuditMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SiteAuditSumOrderByAggregateInputSchema).optional(),
}).strict();

export const SiteAuditScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SiteAuditScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SiteAuditScalarWhereWithAggregatesInputSchema),z.lazy(() => SiteAuditScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SiteAuditScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SiteAuditScalarWhereWithAggregatesInputSchema),z.lazy(() => SiteAuditScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  screenshot: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  loadedTime: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  loadedSize: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  siteId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CertificateWhereInputSchema: z.ZodType<Prisma.CertificateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CertificateWhereInputSchema),z.lazy(() => CertificateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CertificateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CertificateWhereInputSchema),z.lazy(() => CertificateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nip: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nik: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  jabatan: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  organisasiUnit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  certificateStatus: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  notBeforeDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  notAfterDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  unitId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  unit: z.union([ z.lazy(() => UnitRelationFilterSchema),z.lazy(() => UnitWhereInputSchema) ]).optional().nullable(),
}).strict();

export const CertificateOrderByWithRelationInputSchema: z.ZodType<Prisma.CertificateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  nip: z.lazy(() => SortOrderSchema).optional(),
  nik: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  jabatan: z.lazy(() => SortOrderSchema).optional(),
  organisasiUnit: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  certificateStatus: z.lazy(() => SortOrderSchema).optional(),
  notBeforeDate: z.lazy(() => SortOrderSchema).optional(),
  notAfterDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => UnitOrderByWithRelationInputSchema).optional(),
}).strict();

export const CertificateWhereUniqueInputSchema: z.ZodType<Prisma.CertificateWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
}).strict();

export const CertificateOrderByWithAggregationInputSchema: z.ZodType<Prisma.CertificateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  nip: z.lazy(() => SortOrderSchema).optional(),
  nik: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  jabatan: z.lazy(() => SortOrderSchema).optional(),
  organisasiUnit: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  certificateStatus: z.lazy(() => SortOrderSchema).optional(),
  notBeforeDate: z.lazy(() => SortOrderSchema).optional(),
  notAfterDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CertificateCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CertificateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CertificateMinOrderByAggregateInputSchema).optional(),
}).strict();

export const CertificateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CertificateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CertificateScalarWhereWithAggregatesInputSchema),z.lazy(() => CertificateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CertificateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CertificateScalarWhereWithAggregatesInputSchema),z.lazy(() => CertificateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  nip: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  nik: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  jabatan: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  organisasiUnit: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  certificateStatus: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  notBeforeDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  notAfterDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  unitId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const FortigateWhereInputSchema: z.ZodType<Prisma.FortigateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FortigateWhereInputSchema),z.lazy(() => FortigateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FortigateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FortigateWhereInputSchema),z.lazy(() => FortigateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tag: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  path: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FortigateOrderByWithRelationInputSchema: z.ZodType<Prisma.FortigateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  tag: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const FortigateWhereUniqueInputSchema: z.ZodType<Prisma.FortigateWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  path: z.string().optional(),
}).strict();

export const FortigateOrderByWithAggregationInputSchema: z.ZodType<Prisma.FortigateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  tag: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FortigateCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FortigateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FortigateMinOrderByAggregateInputSchema).optional(),
}).strict();

export const FortigateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FortigateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FortigateScalarWhereWithAggregatesInputSchema),z.lazy(() => FortigateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FortigateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FortigateScalarWhereWithAggregatesInputSchema),z.lazy(() => FortigateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tag: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  path: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CsirtPostWhereInputSchema: z.ZodType<Prisma.CsirtPostWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CsirtPostWhereInputSchema),z.lazy(() => CsirtPostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CsirtPostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CsirtPostWhereInputSchema),z.lazy(() => CsirtPostWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  thumbnail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  category: z.union([ z.lazy(() => CsirtCategoryRelationFilterSchema),z.lazy(() => CsirtCategoryWhereInputSchema) ]).optional().nullable(),
  author: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const CsirtPostOrderByWithRelationInputSchema: z.ZodType<Prisma.CsirtPostOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => CsirtCategoryOrderByWithRelationInputSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
}).strict();

export const CsirtPostWhereUniqueInputSchema: z.ZodType<Prisma.CsirtPostWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().optional(),
}).strict();

export const CsirtPostOrderByWithAggregationInputSchema: z.ZodType<Prisma.CsirtPostOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CsirtPostCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CsirtPostMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CsirtPostMinOrderByAggregateInputSchema).optional(),
}).strict();

export const CsirtPostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CsirtPostScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CsirtPostScalarWhereWithAggregatesInputSchema),z.lazy(() => CsirtPostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CsirtPostScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CsirtPostScalarWhereWithAggregatesInputSchema),z.lazy(() => CsirtPostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  thumbnail: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CsirtCategoryWhereInputSchema: z.ZodType<Prisma.CsirtCategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CsirtCategoryWhereInputSchema),z.lazy(() => CsirtCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CsirtCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CsirtCategoryWhereInputSchema),z.lazy(() => CsirtCategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  csirt: z.lazy(() => CsirtPostListRelationFilterSchema).optional(),
}).strict();

export const CsirtCategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.CsirtCategoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  csirt: z.lazy(() => CsirtPostOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const CsirtCategoryWhereUniqueInputSchema: z.ZodType<Prisma.CsirtCategoryWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
}).strict();

export const CsirtCategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CsirtCategoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CsirtCategoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CsirtCategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CsirtCategoryMinOrderByAggregateInputSchema).optional(),
}).strict();

export const CsirtCategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CsirtCategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CsirtCategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CsirtCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CsirtCategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CsirtCategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CsirtCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const HelpdeskWhereInputSchema: z.ZodType<Prisma.HelpdeskWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HelpdeskWhereInputSchema),z.lazy(() => HelpdeskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HelpdeskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HelpdeskWhereInputSchema),z.lazy(() => HelpdeskWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  slug: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  unitId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  category: z.union([ z.lazy(() => HelpdeskCategoryRelationFilterSchema),z.lazy(() => HelpdeskCategoryWhereInputSchema) ]).optional().nullable(),
  unit: z.union([ z.lazy(() => UnitRelationFilterSchema),z.lazy(() => UnitWhereInputSchema) ]).optional(),
}).strict();

export const HelpdeskOrderByWithRelationInputSchema: z.ZodType<Prisma.HelpdeskOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => HelpdeskCategoryOrderByWithRelationInputSchema).optional(),
  unit: z.lazy(() => UnitOrderByWithRelationInputSchema).optional(),
}).strict();

export const HelpdeskWhereUniqueInputSchema: z.ZodType<Prisma.HelpdeskWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
}).strict();

export const HelpdeskOrderByWithAggregationInputSchema: z.ZodType<Prisma.HelpdeskOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => HelpdeskCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HelpdeskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HelpdeskMinOrderByAggregateInputSchema).optional(),
}).strict();

export const HelpdeskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HelpdeskScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HelpdeskScalarWhereWithAggregatesInputSchema),z.lazy(() => HelpdeskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HelpdeskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HelpdeskScalarWhereWithAggregatesInputSchema),z.lazy(() => HelpdeskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  slug: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  unitId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const HelpdeskCategoryWhereInputSchema: z.ZodType<Prisma.HelpdeskCategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HelpdeskCategoryWhereInputSchema),z.lazy(() => HelpdeskCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HelpdeskCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HelpdeskCategoryWhereInputSchema),z.lazy(() => HelpdeskCategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  helpdesk: z.lazy(() => HelpdeskListRelationFilterSchema).optional(),
}).strict();

export const HelpdeskCategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.HelpdeskCategoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  helpdesk: z.lazy(() => HelpdeskOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const HelpdeskCategoryWhereUniqueInputSchema: z.ZodType<Prisma.HelpdeskCategoryWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
}).strict();

export const HelpdeskCategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.HelpdeskCategoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => HelpdeskCategoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HelpdeskCategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HelpdeskCategoryMinOrderByAggregateInputSchema).optional(),
}).strict();

export const HelpdeskCategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HelpdeskCategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HelpdeskCategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => HelpdeskCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HelpdeskCategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HelpdeskCategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => HelpdeskCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const IndeksKamiWhereInputSchema: z.ZodType<Prisma.IndeksKamiWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IndeksKamiWhereInputSchema),z.lazy(() => IndeksKamiWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndeksKamiWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndeksKamiWhereInputSchema),z.lazy(() => IndeksKamiWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  scope: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  summaryAsesi: z.lazy(() => JsonNullableFilterSchema).optional(),
  summaryAsesor: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  unitId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  asesiId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  asesorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  category: z.union([ z.lazy(() => IndeksKamiCategoryRelationFilterSchema),z.lazy(() => IndeksKamiCategoryWhereInputSchema) ]).optional().nullable(),
  unit: z.union([ z.lazy(() => UnitRelationFilterSchema),z.lazy(() => UnitWhereInputSchema) ]).optional().nullable(),
  asesi: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  asesor: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  result: z.lazy(() => IndeksKamiDataListRelationFilterSchema).optional(),
}).strict();

export const IndeksKamiOrderByWithRelationInputSchema: z.ZodType<Prisma.IndeksKamiOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  summaryAsesi: z.lazy(() => SortOrderSchema).optional(),
  summaryAsesor: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  asesiId: z.lazy(() => SortOrderSchema).optional(),
  asesorId: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => IndeksKamiCategoryOrderByWithRelationInputSchema).optional(),
  unit: z.lazy(() => UnitOrderByWithRelationInputSchema).optional(),
  asesi: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  asesor: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  result: z.lazy(() => IndeksKamiDataOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const IndeksKamiWhereUniqueInputSchema: z.ZodType<Prisma.IndeksKamiWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
}).strict();

export const IndeksKamiOrderByWithAggregationInputSchema: z.ZodType<Prisma.IndeksKamiOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  summaryAsesi: z.lazy(() => SortOrderSchema).optional(),
  summaryAsesor: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  asesiId: z.lazy(() => SortOrderSchema).optional(),
  asesorId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => IndeksKamiCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IndeksKamiMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IndeksKamiMinOrderByAggregateInputSchema).optional(),
}).strict();

export const IndeksKamiScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IndeksKamiScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => IndeksKamiScalarWhereWithAggregatesInputSchema),z.lazy(() => IndeksKamiScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndeksKamiScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndeksKamiScalarWhereWithAggregatesInputSchema),z.lazy(() => IndeksKamiScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  scope: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  summaryAsesi: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  summaryAsesor: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  unitId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  asesiId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  asesorId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const IndeksKamiCategoryWhereInputSchema: z.ZodType<Prisma.IndeksKamiCategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IndeksKamiCategoryWhereInputSchema),z.lazy(() => IndeksKamiCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndeksKamiCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndeksKamiCategoryWhereInputSchema),z.lazy(() => IndeksKamiCategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  part: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  IndeksKami: z.lazy(() => IndeksKamiListRelationFilterSchema).optional(),
}).strict();

export const IndeksKamiCategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.IndeksKamiCategoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  IndeksKami: z.lazy(() => IndeksKamiOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const IndeksKamiCategoryWhereUniqueInputSchema: z.ZodType<Prisma.IndeksKamiCategoryWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
}).strict();

export const IndeksKamiCategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.IndeksKamiCategoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => IndeksKamiCategoryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => IndeksKamiCategoryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IndeksKamiCategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IndeksKamiCategoryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => IndeksKamiCategorySumOrderByAggregateInputSchema).optional(),
}).strict();

export const IndeksKamiCategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IndeksKamiCategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => IndeksKamiCategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => IndeksKamiCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndeksKamiCategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndeksKamiCategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => IndeksKamiCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  part: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const IndeksKamiCriteriaWhereInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IndeksKamiCriteriaWhereInputSchema),z.lazy(() => IndeksKamiCriteriaWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndeksKamiCriteriaWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndeksKamiCriteriaWhereInputSchema),z.lazy(() => IndeksKamiCriteriaWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  tag: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  category: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  require: z.lazy(() => JsonNullableFilterSchema).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const IndeksKamiCriteriaOrderByWithRelationInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  tag: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  require: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiCriteriaWhereUniqueInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
}).strict();

export const IndeksKamiCriteriaOrderByWithAggregationInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  tag: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  require: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => IndeksKamiCriteriaCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => IndeksKamiCriteriaAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IndeksKamiCriteriaMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IndeksKamiCriteriaMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => IndeksKamiCriteriaSumOrderByAggregateInputSchema).optional(),
}).strict();

export const IndeksKamiCriteriaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => IndeksKamiCriteriaScalarWhereWithAggregatesInputSchema),z.lazy(() => IndeksKamiCriteriaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndeksKamiCriteriaScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndeksKamiCriteriaScalarWhereWithAggregatesInputSchema),z.lazy(() => IndeksKamiCriteriaScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  tag: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  category: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  require: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const IndeksKamiTemplateWhereInputSchema: z.ZodType<Prisma.IndeksKamiTemplateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IndeksKamiTemplateWhereInputSchema),z.lazy(() => IndeksKamiTemplateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndeksKamiTemplateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndeksKamiTemplateWhereInputSchema),z.lazy(() => IndeksKamiTemplateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  header: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  category: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  part: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  step: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  question: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  example: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  options: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  result: z.lazy(() => IndeksKamiDataListRelationFilterSchema).optional(),
}).strict();

export const IndeksKamiTemplateOrderByWithRelationInputSchema: z.ZodType<Prisma.IndeksKamiTemplateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  header: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => SortOrderSchema).optional(),
  step: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  example: z.lazy(() => SortOrderSchema).optional(),
  options: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  result: z.lazy(() => IndeksKamiDataOrderByRelationAggregateInputSchema).optional(),
}).strict();

export const IndeksKamiTemplateWhereUniqueInputSchema: z.ZodType<Prisma.IndeksKamiTemplateWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
}).strict();

export const IndeksKamiTemplateOrderByWithAggregationInputSchema: z.ZodType<Prisma.IndeksKamiTemplateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  header: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => SortOrderSchema).optional(),
  step: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  example: z.lazy(() => SortOrderSchema).optional(),
  options: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => IndeksKamiTemplateCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => IndeksKamiTemplateAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IndeksKamiTemplateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IndeksKamiTemplateMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => IndeksKamiTemplateSumOrderByAggregateInputSchema).optional(),
}).strict();

export const IndeksKamiTemplateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IndeksKamiTemplateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => IndeksKamiTemplateScalarWhereWithAggregatesInputSchema),z.lazy(() => IndeksKamiTemplateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndeksKamiTemplateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndeksKamiTemplateScalarWhereWithAggregatesInputSchema),z.lazy(() => IndeksKamiTemplateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  header: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  category: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  part: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  step: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  question: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  example: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  options: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const IndeksKamiDataWhereInputSchema: z.ZodType<Prisma.IndeksKamiDataWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IndeksKamiDataWhereInputSchema),z.lazy(() => IndeksKamiDataWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndeksKamiDataWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndeksKamiDataWhereInputSchema),z.lazy(() => IndeksKamiDataWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  file: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  filename: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  category: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  part: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  step: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  indeksId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  templateId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  IndeksKami: z.union([ z.lazy(() => IndeksKamiRelationFilterSchema),z.lazy(() => IndeksKamiWhereInputSchema) ]).optional().nullable(),
  template: z.union([ z.lazy(() => IndeksKamiTemplateRelationFilterSchema),z.lazy(() => IndeksKamiTemplateWhereInputSchema) ]).optional().nullable(),
}).strict();

export const IndeksKamiDataOrderByWithRelationInputSchema: z.ZodType<Prisma.IndeksKamiDataOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  file: z.lazy(() => SortOrderSchema).optional(),
  filename: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => SortOrderSchema).optional(),
  step: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  indeksId: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  IndeksKami: z.lazy(() => IndeksKamiOrderByWithRelationInputSchema).optional(),
  template: z.lazy(() => IndeksKamiTemplateOrderByWithRelationInputSchema).optional(),
}).strict();

export const IndeksKamiDataWhereUniqueInputSchema: z.ZodType<Prisma.IndeksKamiDataWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
}).strict();

export const IndeksKamiDataOrderByWithAggregationInputSchema: z.ZodType<Prisma.IndeksKamiDataOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  file: z.lazy(() => SortOrderSchema).optional(),
  filename: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => SortOrderSchema).optional(),
  step: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  indeksId: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => IndeksKamiDataCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => IndeksKamiDataAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => IndeksKamiDataMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => IndeksKamiDataMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => IndeksKamiDataSumOrderByAggregateInputSchema).optional(),
}).strict();

export const IndeksKamiDataScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.IndeksKamiDataScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => IndeksKamiDataScalarWhereWithAggregatesInputSchema),z.lazy(() => IndeksKamiDataScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndeksKamiDataScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndeksKamiDataScalarWhereWithAggregatesInputSchema),z.lazy(() => IndeksKamiDataScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  file: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  filename: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  category: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  part: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  step: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  indeksId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  templateId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUserInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutUserInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiCreateNestedManyWithoutAsesiInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiCreateNestedManyWithoutAsesorInputSchema).optional(),
  Devices: z.lazy(() => DevicesCreateNestedOneWithoutUserInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostCreateNestedManyWithoutAuthorInputSchema).optional(),
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  roleId: z.string().optional().nullable(),
  unitId: z.string().optional().nullable(),
  devicesId: z.string().optional().nullable(),
  Asesi: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutAsesiInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutAsesorInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.lazy(() => RoleUpdateOneWithoutUserNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutUserNestedInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUpdateManyWithoutAsesiNestedInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiUpdateManyWithoutAsesorNestedInputSchema).optional(),
  Devices: z.lazy(() => DevicesUpdateOneWithoutUserNestedInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUpdateManyWithoutAuthorNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  devicesId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Asesi: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutAsesiNestedInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutAsesorNestedInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  roleId: z.string().optional().nullable(),
  unitId: z.string().optional().nullable(),
  devicesId: z.string().optional().nullable(),
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  devicesId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RoleCreateInputSchema: z.ZodType<Prisma.RoleCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  permissions: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  User: z.lazy(() => UserCreateNestedManyWithoutRoleInputSchema).optional(),
}).strict();

export const RoleUncheckedCreateInputSchema: z.ZodType<Prisma.RoleUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  permissions: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutRoleInputSchema).optional(),
}).strict();

export const RoleUpdateInputSchema: z.ZodType<Prisma.RoleUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUpdateManyWithoutRoleNestedInputSchema).optional(),
}).strict();

export const RoleUncheckedUpdateInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutRoleNestedInputSchema).optional(),
}).strict();

export const RoleCreateManyInputSchema: z.ZodType<Prisma.RoleCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  permissions: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
}).strict();

export const RoleUpdateManyMutationInputSchema: z.ZodType<Prisma.RoleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RoleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UnitCreateInputSchema: z.ZodType<Prisma.UnitCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  User: z.lazy(() => UserCreateNestedManyWithoutUnitInputSchema).optional(),
  Site: z.lazy(() => SiteCreateNestedManyWithoutUnitInputSchema).optional(),
  Certificate: z.lazy(() => CertificateCreateNestedManyWithoutUnitInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiCreateNestedManyWithoutUnitInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskCreateNestedManyWithoutUnitInputSchema).optional(),
}).strict();

export const UnitUncheckedCreateInputSchema: z.ZodType<Prisma.UnitUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Site: z.lazy(() => SiteUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Certificate: z.lazy(() => CertificateUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
}).strict();

export const UnitUpdateInputSchema: z.ZodType<Prisma.UnitUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUpdateManyWithoutUnitNestedInputSchema).optional(),
  Site: z.lazy(() => SiteUpdateManyWithoutUnitNestedInputSchema).optional(),
  Certificate: z.lazy(() => CertificateUpdateManyWithoutUnitNestedInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUpdateManyWithoutUnitNestedInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskUpdateManyWithoutUnitNestedInputSchema).optional(),
}).strict();

export const UnitUncheckedUpdateInputSchema: z.ZodType<Prisma.UnitUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Site: z.lazy(() => SiteUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Certificate: z.lazy(() => CertificateUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
}).strict();

export const UnitCreateManyInputSchema: z.ZodType<Prisma.UnitCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
}).strict();

export const UnitUpdateManyMutationInputSchema: z.ZodType<Prisma.UnitUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UnitUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UnitUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DevicesCreateInputSchema: z.ZodType<Prisma.DevicesCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  User: z.lazy(() => UserCreateNestedManyWithoutDevicesInputSchema).optional(),
}).strict();

export const DevicesUncheckedCreateInputSchema: z.ZodType<Prisma.DevicesUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutDevicesInputSchema).optional(),
}).strict();

export const DevicesUpdateInputSchema: z.ZodType<Prisma.DevicesUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUpdateManyWithoutDevicesNestedInputSchema).optional(),
}).strict();

export const DevicesUncheckedUpdateInputSchema: z.ZodType<Prisma.DevicesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutDevicesNestedInputSchema).optional(),
}).strict();

export const DevicesCreateManyInputSchema: z.ZodType<Prisma.DevicesCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
}).strict();

export const DevicesUpdateManyMutationInputSchema: z.ZodType<Prisma.DevicesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DevicesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DevicesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SiteCreateInputSchema: z.ZodType<Prisma.SiteCreateInput> = z.object({
  id: z.string().uuid().optional(),
  url: z.string().optional().nullable(),
  ip: z.string().optional().nullable(),
  localIp: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  scanAt: z.coerce.date().optional().nullable(),
  siteAudit: z.lazy(() => SiteAuditCreateNestedManyWithoutSiteInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutSiteInputSchema).optional(),
}).strict();

export const SiteUncheckedCreateInputSchema: z.ZodType<Prisma.SiteUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  url: z.string().optional().nullable(),
  ip: z.string().optional().nullable(),
  localIp: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  scanAt: z.coerce.date().optional().nullable(),
  unitId: z.string().optional().nullable(),
  siteAudit: z.lazy(() => SiteAuditUncheckedCreateNestedManyWithoutSiteInputSchema).optional(),
}).strict();

export const SiteUpdateInputSchema: z.ZodType<Prisma.SiteUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localIp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scanAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  siteAudit: z.lazy(() => SiteAuditUpdateManyWithoutSiteNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutSiteNestedInputSchema).optional(),
}).strict();

export const SiteUncheckedUpdateInputSchema: z.ZodType<Prisma.SiteUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localIp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scanAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  siteAudit: z.lazy(() => SiteAuditUncheckedUpdateManyWithoutSiteNestedInputSchema).optional(),
}).strict();

export const SiteCreateManyInputSchema: z.ZodType<Prisma.SiteCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  url: z.string().optional().nullable(),
  ip: z.string().optional().nullable(),
  localIp: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  scanAt: z.coerce.date().optional().nullable(),
  unitId: z.string().optional().nullable(),
}).strict();

export const SiteUpdateManyMutationInputSchema: z.ZodType<Prisma.SiteUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localIp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scanAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SiteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SiteUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localIp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scanAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SiteAuditCreateInputSchema: z.ZodType<Prisma.SiteAuditCreateInput> = z.object({
  id: z.string().uuid().optional(),
  screenshot: z.string().optional().nullable(),
  loadedTime: z.number().optional(),
  loadedSize: z.number().optional(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  site: z.lazy(() => SiteCreateNestedOneWithoutSiteAuditInputSchema),
}).strict();

export const SiteAuditUncheckedCreateInputSchema: z.ZodType<Prisma.SiteAuditUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  screenshot: z.string().optional().nullable(),
  loadedTime: z.number().optional(),
  loadedSize: z.number().optional(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  siteId: z.string(),
}).strict();

export const SiteAuditUpdateInputSchema: z.ZodType<Prisma.SiteAuditUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  screenshot: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loadedTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loadedSize: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  site: z.lazy(() => SiteUpdateOneRequiredWithoutSiteAuditNestedInputSchema).optional(),
}).strict();

export const SiteAuditUncheckedUpdateInputSchema: z.ZodType<Prisma.SiteAuditUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  screenshot: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loadedTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loadedSize: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  siteId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SiteAuditCreateManyInputSchema: z.ZodType<Prisma.SiteAuditCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  screenshot: z.string().optional().nullable(),
  loadedTime: z.number().optional(),
  loadedSize: z.number().optional(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  siteId: z.string(),
}).strict();

export const SiteAuditUpdateManyMutationInputSchema: z.ZodType<Prisma.SiteAuditUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  screenshot: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loadedTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loadedSize: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SiteAuditUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SiteAuditUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  screenshot: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loadedTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loadedSize: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  siteId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CertificateCreateInputSchema: z.ZodType<Prisma.CertificateCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  nip: z.string().optional().nullable(),
  nik: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  jabatan: z.string().optional().nullable(),
  organisasiUnit: z.string().optional().nullable(),
  status: z.string(),
  certificateStatus: z.string(),
  notBeforeDate: z.coerce.date().optional().nullable(),
  notAfterDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutCertificateInputSchema).optional(),
}).strict();

export const CertificateUncheckedCreateInputSchema: z.ZodType<Prisma.CertificateUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  nip: z.string().optional().nullable(),
  nik: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  jabatan: z.string().optional().nullable(),
  organisasiUnit: z.string().optional().nullable(),
  status: z.string(),
  certificateStatus: z.string(),
  notBeforeDate: z.coerce.date().optional().nullable(),
  notAfterDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  unitId: z.string().optional().nullable(),
}).strict();

export const CertificateUpdateInputSchema: z.ZodType<Prisma.CertificateUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nik: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  jabatan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organisasiUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notBeforeDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notAfterDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutCertificateNestedInputSchema).optional(),
}).strict();

export const CertificateUncheckedUpdateInputSchema: z.ZodType<Prisma.CertificateUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nik: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  jabatan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organisasiUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notBeforeDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notAfterDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CertificateCreateManyInputSchema: z.ZodType<Prisma.CertificateCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  nip: z.string().optional().nullable(),
  nik: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  jabatan: z.string().optional().nullable(),
  organisasiUnit: z.string().optional().nullable(),
  status: z.string(),
  certificateStatus: z.string(),
  notBeforeDate: z.coerce.date().optional().nullable(),
  notAfterDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  unitId: z.string().optional().nullable(),
}).strict();

export const CertificateUpdateManyMutationInputSchema: z.ZodType<Prisma.CertificateUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nik: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  jabatan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organisasiUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notBeforeDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notAfterDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CertificateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CertificateUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nik: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  jabatan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organisasiUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notBeforeDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notAfterDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const FortigateCreateInputSchema: z.ZodType<Prisma.FortigateCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  tag: z.string(),
  path: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const FortigateUncheckedCreateInputSchema: z.ZodType<Prisma.FortigateUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  tag: z.string(),
  path: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const FortigateUpdateInputSchema: z.ZodType<Prisma.FortigateUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FortigateUncheckedUpdateInputSchema: z.ZodType<Prisma.FortigateUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FortigateCreateManyInputSchema: z.ZodType<Prisma.FortigateCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  tag: z.string(),
  path: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const FortigateUpdateManyMutationInputSchema: z.ZodType<Prisma.FortigateUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FortigateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FortigateUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CsirtPostCreateInputSchema: z.ZodType<Prisma.CsirtPostCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  thumbnail: z.string().optional().nullable(),
  type: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  category: z.lazy(() => CsirtCategoryCreateNestedOneWithoutCsirtInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutCsirtPostInputSchema).optional(),
}).strict();

export const CsirtPostUncheckedCreateInputSchema: z.ZodType<Prisma.CsirtPostUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  thumbnail: z.string().optional().nullable(),
  type: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
}).strict();

export const CsirtPostUpdateInputSchema: z.ZodType<Prisma.CsirtPostUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => CsirtCategoryUpdateOneWithoutCsirtNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneWithoutCsirtPostNestedInputSchema).optional(),
}).strict();

export const CsirtPostUncheckedUpdateInputSchema: z.ZodType<Prisma.CsirtPostUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CsirtPostCreateManyInputSchema: z.ZodType<Prisma.CsirtPostCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  thumbnail: z.string().optional().nullable(),
  type: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
}).strict();

export const CsirtPostUpdateManyMutationInputSchema: z.ZodType<Prisma.CsirtPostUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CsirtPostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CsirtPostUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CsirtCategoryCreateInputSchema: z.ZodType<Prisma.CsirtCategoryCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  csirt: z.lazy(() => CsirtPostCreateNestedManyWithoutCategoryInputSchema).optional(),
}).strict();

export const CsirtCategoryUncheckedCreateInputSchema: z.ZodType<Prisma.CsirtCategoryUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  csirt: z.lazy(() => CsirtPostUncheckedCreateNestedManyWithoutCategoryInputSchema).optional(),
}).strict();

export const CsirtCategoryUpdateInputSchema: z.ZodType<Prisma.CsirtCategoryUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  csirt: z.lazy(() => CsirtPostUpdateManyWithoutCategoryNestedInputSchema).optional(),
}).strict();

export const CsirtCategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.CsirtCategoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  csirt: z.lazy(() => CsirtPostUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional(),
}).strict();

export const CsirtCategoryCreateManyInputSchema: z.ZodType<Prisma.CsirtCategoryCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const CsirtCategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.CsirtCategoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CsirtCategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CsirtCategoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HelpdeskCreateInputSchema: z.ZodType<Prisma.HelpdeskCreateInput> = z.object({
  id: z.string().uuid().optional(),
  subject: z.string(),
  content: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
  slug: z.string().optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  category: z.lazy(() => HelpdeskCategoryCreateNestedOneWithoutHelpdeskInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutHelpdeskInputSchema),
}).strict();

export const HelpdeskUncheckedCreateInputSchema: z.ZodType<Prisma.HelpdeskUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  subject: z.string(),
  content: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
  slug: z.string().optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  unitId: z.string(),
}).strict();

export const HelpdeskUpdateInputSchema: z.ZodType<Prisma.HelpdeskUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => HelpdeskCategoryUpdateOneWithoutHelpdeskNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneRequiredWithoutHelpdeskNestedInputSchema).optional(),
}).strict();

export const HelpdeskUncheckedUpdateInputSchema: z.ZodType<Prisma.HelpdeskUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HelpdeskCreateManyInputSchema: z.ZodType<Prisma.HelpdeskCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  subject: z.string(),
  content: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
  slug: z.string().optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  unitId: z.string(),
}).strict();

export const HelpdeskUpdateManyMutationInputSchema: z.ZodType<Prisma.HelpdeskUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HelpdeskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HelpdeskUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HelpdeskCategoryCreateInputSchema: z.ZodType<Prisma.HelpdeskCategoryCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  helpdesk: z.lazy(() => HelpdeskCreateNestedManyWithoutCategoryInputSchema).optional(),
}).strict();

export const HelpdeskCategoryUncheckedCreateInputSchema: z.ZodType<Prisma.HelpdeskCategoryUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  helpdesk: z.lazy(() => HelpdeskUncheckedCreateNestedManyWithoutCategoryInputSchema).optional(),
}).strict();

export const HelpdeskCategoryUpdateInputSchema: z.ZodType<Prisma.HelpdeskCategoryUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  helpdesk: z.lazy(() => HelpdeskUpdateManyWithoutCategoryNestedInputSchema).optional(),
}).strict();

export const HelpdeskCategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.HelpdeskCategoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  helpdesk: z.lazy(() => HelpdeskUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional(),
}).strict();

export const HelpdeskCategoryCreateManyInputSchema: z.ZodType<Prisma.HelpdeskCategoryCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const HelpdeskCategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.HelpdeskCategoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HelpdeskCategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HelpdeskCategoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndeksKamiCreateInputSchema: z.ZodType<Prisma.IndeksKamiCreateInput> = z.object({
  id: z.string().uuid().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  category: z.lazy(() => IndeksKamiCategoryCreateNestedOneWithoutIndeksKamiInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutAsesiInputSchema).optional(),
  asesi: z.lazy(() => UserCreateNestedOneWithoutAsesiInputSchema).optional(),
  asesor: z.lazy(() => UserCreateNestedOneWithoutAsesorInputSchema).optional(),
  result: z.lazy(() => IndeksKamiDataCreateNestedManyWithoutIndeksKamiInputSchema).optional(),
}).strict();

export const IndeksKamiUncheckedCreateInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  unitId: z.string().optional().nullable(),
  asesiId: z.string(),
  asesorId: z.string().optional().nullable(),
  result: z.lazy(() => IndeksKamiDataUncheckedCreateNestedManyWithoutIndeksKamiInputSchema).optional(),
}).strict();

export const IndeksKamiUpdateInputSchema: z.ZodType<Prisma.IndeksKamiUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => IndeksKamiCategoryUpdateOneWithoutIndeksKamiNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutAsesiNestedInputSchema).optional(),
  asesi: z.lazy(() => UserUpdateOneWithoutAsesiNestedInputSchema).optional(),
  asesor: z.lazy(() => UserUpdateOneWithoutAsesorNestedInputSchema).optional(),
  result: z.lazy(() => IndeksKamiDataUpdateManyWithoutIndeksKamiNestedInputSchema).optional(),
}).strict();

export const IndeksKamiUncheckedUpdateInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asesiId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  asesorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  result: z.lazy(() => IndeksKamiDataUncheckedUpdateManyWithoutIndeksKamiNestedInputSchema).optional(),
}).strict();

export const IndeksKamiCreateManyInputSchema: z.ZodType<Prisma.IndeksKamiCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  unitId: z.string().optional().nullable(),
  asesiId: z.string(),
  asesorId: z.string().optional().nullable(),
}).strict();

export const IndeksKamiUpdateManyMutationInputSchema: z.ZodType<Prisma.IndeksKamiUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndeksKamiUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asesiId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  asesorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IndeksKamiCategoryCreateInputSchema: z.ZodType<Prisma.IndeksKamiCategoryCreateInput> = z.object({
  id: z.string().uuid().optional(),
  version: z.string().optional(),
  code: z.number(),
  type: z.string(),
  part: z.string(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  IndeksKami: z.lazy(() => IndeksKamiCreateNestedManyWithoutCategoryInputSchema).optional(),
}).strict();

export const IndeksKamiCategoryUncheckedCreateInputSchema: z.ZodType<Prisma.IndeksKamiCategoryUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  version: z.string().optional(),
  code: z.number(),
  type: z.string(),
  part: z.string(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  IndeksKami: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutCategoryInputSchema).optional(),
}).strict();

export const IndeksKamiCategoryUpdateInputSchema: z.ZodType<Prisma.IndeksKamiCategoryUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  IndeksKami: z.lazy(() => IndeksKamiUpdateManyWithoutCategoryNestedInputSchema).optional(),
}).strict();

export const IndeksKamiCategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.IndeksKamiCategoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  IndeksKami: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional(),
}).strict();

export const IndeksKamiCategoryCreateManyInputSchema: z.ZodType<Prisma.IndeksKamiCategoryCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  version: z.string().optional(),
  code: z.number(),
  type: z.string(),
  part: z.string(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const IndeksKamiCategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.IndeksKamiCategoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndeksKamiCategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IndeksKamiCategoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndeksKamiCriteriaCreateInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaCreateInput> = z.object({
  id: z.string().uuid().optional(),
  version: z.string().optional(),
  code: z.number(),
  tag: z.string().optional().nullable(),
  category: z.number().optional().nullable(),
  require: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const IndeksKamiCriteriaUncheckedCreateInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  version: z.string().optional(),
  code: z.number(),
  tag: z.string().optional().nullable(),
  category: z.number().optional().nullable(),
  require: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const IndeksKamiCriteriaUpdateInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  require: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndeksKamiCriteriaUncheckedUpdateInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  require: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndeksKamiCriteriaCreateManyInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  version: z.string().optional(),
  code: z.number(),
  tag: z.string().optional().nullable(),
  category: z.number().optional().nullable(),
  require: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const IndeksKamiCriteriaUpdateManyMutationInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  require: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndeksKamiCriteriaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  require: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndeksKamiTemplateCreateInputSchema: z.ZodType<Prisma.IndeksKamiTemplateCreateInput> = z.object({
  id: z.string().uuid().optional(),
  version: z.string().optional(),
  header: z.string().optional().nullable(),
  category: z.number(),
  code: z.string(),
  part: z.string().optional().nullable(),
  step: z.number().optional().nullable(),
  question: z.string(),
  example: z.string().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  result: z.lazy(() => IndeksKamiDataCreateNestedManyWithoutTemplateInputSchema).optional(),
}).strict();

export const IndeksKamiTemplateUncheckedCreateInputSchema: z.ZodType<Prisma.IndeksKamiTemplateUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  version: z.string().optional(),
  header: z.string().optional().nullable(),
  category: z.number(),
  code: z.string(),
  part: z.string().optional().nullable(),
  step: z.number().optional().nullable(),
  question: z.string(),
  example: z.string().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  result: z.lazy(() => IndeksKamiDataUncheckedCreateNestedManyWithoutTemplateInputSchema).optional(),
}).strict();

export const IndeksKamiTemplateUpdateInputSchema: z.ZodType<Prisma.IndeksKamiTemplateUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  header: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  step: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  example: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  result: z.lazy(() => IndeksKamiDataUpdateManyWithoutTemplateNestedInputSchema).optional(),
}).strict();

export const IndeksKamiTemplateUncheckedUpdateInputSchema: z.ZodType<Prisma.IndeksKamiTemplateUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  header: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  step: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  example: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  result: z.lazy(() => IndeksKamiDataUncheckedUpdateManyWithoutTemplateNestedInputSchema).optional(),
}).strict();

export const IndeksKamiTemplateCreateManyInputSchema: z.ZodType<Prisma.IndeksKamiTemplateCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  version: z.string().optional(),
  header: z.string().optional().nullable(),
  category: z.number(),
  code: z.string(),
  part: z.string().optional().nullable(),
  step: z.number().optional().nullable(),
  question: z.string(),
  example: z.string().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const IndeksKamiTemplateUpdateManyMutationInputSchema: z.ZodType<Prisma.IndeksKamiTemplateUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  header: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  step: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  example: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndeksKamiTemplateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IndeksKamiTemplateUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  header: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  step: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  example: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndeksKamiDataCreateInputSchema: z.ZodType<Prisma.IndeksKamiDataCreateInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.string().optional(),
  value: z.number().optional().nullable(),
  file: z.string().optional().nullable(),
  filename: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  category: z.number(),
  code: z.string(),
  part: z.string().optional().nullable(),
  step: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  IndeksKami: z.lazy(() => IndeksKamiCreateNestedOneWithoutResultInputSchema).optional(),
  template: z.lazy(() => IndeksKamiTemplateCreateNestedOneWithoutResultInputSchema).optional(),
}).strict();

export const IndeksKamiDataUncheckedCreateInputSchema: z.ZodType<Prisma.IndeksKamiDataUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.string().optional(),
  value: z.number().optional().nullable(),
  file: z.string().optional().nullable(),
  filename: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  category: z.number(),
  code: z.string(),
  part: z.string().optional().nullable(),
  step: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  indeksId: z.string().optional().nullable(),
  templateId: z.string().optional().nullable(),
}).strict();

export const IndeksKamiDataUpdateInputSchema: z.ZodType<Prisma.IndeksKamiDataUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  file: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  filename: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  step: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  IndeksKami: z.lazy(() => IndeksKamiUpdateOneWithoutResultNestedInputSchema).optional(),
  template: z.lazy(() => IndeksKamiTemplateUpdateOneWithoutResultNestedInputSchema).optional(),
}).strict();

export const IndeksKamiDataUncheckedUpdateInputSchema: z.ZodType<Prisma.IndeksKamiDataUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  file: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  filename: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  step: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  indeksId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  templateId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IndeksKamiDataCreateManyInputSchema: z.ZodType<Prisma.IndeksKamiDataCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.string().optional(),
  value: z.number().optional().nullable(),
  file: z.string().optional().nullable(),
  filename: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  category: z.number(),
  code: z.string(),
  part: z.string().optional().nullable(),
  step: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  indeksId: z.string().optional().nullable(),
  templateId: z.string().optional().nullable(),
}).strict();

export const IndeksKamiDataUpdateManyMutationInputSchema: z.ZodType<Prisma.IndeksKamiDataUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  file: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  filename: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  step: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndeksKamiDataUncheckedUpdateManyInputSchema: z.ZodType<Prisma.IndeksKamiDataUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  file: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  filename: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  step: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  indeksId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  templateId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const RoleRelationFilterSchema: z.ZodType<Prisma.RoleRelationFilter> = z.object({
  is: z.lazy(() => RoleWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => RoleWhereInputSchema).optional().nullable(),
}).strict();

export const UnitRelationFilterSchema: z.ZodType<Prisma.UnitRelationFilter> = z.object({
  is: z.lazy(() => UnitWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UnitWhereInputSchema).optional().nullable(),
}).strict();

export const IndeksKamiListRelationFilterSchema: z.ZodType<Prisma.IndeksKamiListRelationFilter> = z.object({
  every: z.lazy(() => IndeksKamiWhereInputSchema).optional(),
  some: z.lazy(() => IndeksKamiWhereInputSchema).optional(),
  none: z.lazy(() => IndeksKamiWhereInputSchema).optional(),
}).strict();

export const DevicesRelationFilterSchema: z.ZodType<Prisma.DevicesRelationFilter> = z.object({
  is: z.lazy(() => DevicesWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => DevicesWhereInputSchema).optional().nullable(),
}).strict();

export const CsirtPostListRelationFilterSchema: z.ZodType<Prisma.CsirtPostListRelationFilter> = z.object({
  every: z.lazy(() => CsirtPostWhereInputSchema).optional(),
  some: z.lazy(() => CsirtPostWhereInputSchema).optional(),
  none: z.lazy(() => CsirtPostWhereInputSchema).optional(),
}).strict();

export const IndeksKamiOrderByRelationAggregateInputSchema: z.ZodType<Prisma.IndeksKamiOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CsirtPostOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CsirtPostOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  devicesId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  devicesId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  devicesId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
}).strict();

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const RoleCountOrderByAggregateInputSchema: z.ZodType<Prisma.RoleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  permissions: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const RoleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RoleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const RoleMinOrderByAggregateInputSchema: z.ZodType<Prisma.RoleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional(),
}).strict();

export const SiteListRelationFilterSchema: z.ZodType<Prisma.SiteListRelationFilter> = z.object({
  every: z.lazy(() => SiteWhereInputSchema).optional(),
  some: z.lazy(() => SiteWhereInputSchema).optional(),
  none: z.lazy(() => SiteWhereInputSchema).optional(),
}).strict();

export const CertificateListRelationFilterSchema: z.ZodType<Prisma.CertificateListRelationFilter> = z.object({
  every: z.lazy(() => CertificateWhereInputSchema).optional(),
  some: z.lazy(() => CertificateWhereInputSchema).optional(),
  none: z.lazy(() => CertificateWhereInputSchema).optional(),
}).strict();

export const HelpdeskListRelationFilterSchema: z.ZodType<Prisma.HelpdeskListRelationFilter> = z.object({
  every: z.lazy(() => HelpdeskWhereInputSchema).optional(),
  some: z.lazy(() => HelpdeskWhereInputSchema).optional(),
  none: z.lazy(() => HelpdeskWhereInputSchema).optional(),
}).strict();

export const SiteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SiteOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CertificateOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CertificateOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const HelpdeskOrderByRelationAggregateInputSchema: z.ZodType<Prisma.HelpdeskOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UnitCountOrderByAggregateInputSchema: z.ZodType<Prisma.UnitCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UnitMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UnitMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UnitMinOrderByAggregateInputSchema: z.ZodType<Prisma.UnitMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DevicesCountOrderByAggregateInputSchema: z.ZodType<Prisma.DevicesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DevicesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DevicesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const DevicesMinOrderByAggregateInputSchema: z.ZodType<Prisma.DevicesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SiteAuditListRelationFilterSchema: z.ZodType<Prisma.SiteAuditListRelationFilter> = z.object({
  every: z.lazy(() => SiteAuditWhereInputSchema).optional(),
  some: z.lazy(() => SiteAuditWhereInputSchema).optional(),
  none: z.lazy(() => SiteAuditWhereInputSchema).optional(),
}).strict();

export const SiteAuditOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SiteAuditOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SiteCountOrderByAggregateInputSchema: z.ZodType<Prisma.SiteCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  ip: z.lazy(() => SortOrderSchema).optional(),
  localIp: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  scanAt: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SiteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SiteMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  ip: z.lazy(() => SortOrderSchema).optional(),
  localIp: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  scanAt: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SiteMinOrderByAggregateInputSchema: z.ZodType<Prisma.SiteMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  ip: z.lazy(() => SortOrderSchema).optional(),
  localIp: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  scanAt: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const SiteRelationFilterSchema: z.ZodType<Prisma.SiteRelationFilter> = z.object({
  is: z.lazy(() => SiteWhereInputSchema).optional(),
  isNot: z.lazy(() => SiteWhereInputSchema).optional(),
}).strict();

export const SiteAuditCountOrderByAggregateInputSchema: z.ZodType<Prisma.SiteAuditCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  screenshot: z.lazy(() => SortOrderSchema).optional(),
  loadedTime: z.lazy(() => SortOrderSchema).optional(),
  loadedSize: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  siteId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SiteAuditAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SiteAuditAvgOrderByAggregateInput> = z.object({
  loadedTime: z.lazy(() => SortOrderSchema).optional(),
  loadedSize: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SiteAuditMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SiteAuditMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  screenshot: z.lazy(() => SortOrderSchema).optional(),
  loadedTime: z.lazy(() => SortOrderSchema).optional(),
  loadedSize: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  siteId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SiteAuditMinOrderByAggregateInputSchema: z.ZodType<Prisma.SiteAuditMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  screenshot: z.lazy(() => SortOrderSchema).optional(),
  loadedTime: z.lazy(() => SortOrderSchema).optional(),
  loadedSize: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  siteId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const SiteAuditSumOrderByAggregateInputSchema: z.ZodType<Prisma.SiteAuditSumOrderByAggregateInput> = z.object({
  loadedTime: z.lazy(() => SortOrderSchema).optional(),
  loadedSize: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
}).strict();

export const CertificateCountOrderByAggregateInputSchema: z.ZodType<Prisma.CertificateCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  nip: z.lazy(() => SortOrderSchema).optional(),
  nik: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  jabatan: z.lazy(() => SortOrderSchema).optional(),
  organisasiUnit: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  certificateStatus: z.lazy(() => SortOrderSchema).optional(),
  notBeforeDate: z.lazy(() => SortOrderSchema).optional(),
  notAfterDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CertificateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CertificateMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  nip: z.lazy(() => SortOrderSchema).optional(),
  nik: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  jabatan: z.lazy(() => SortOrderSchema).optional(),
  organisasiUnit: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  certificateStatus: z.lazy(() => SortOrderSchema).optional(),
  notBeforeDate: z.lazy(() => SortOrderSchema).optional(),
  notAfterDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CertificateMinOrderByAggregateInputSchema: z.ZodType<Prisma.CertificateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  nip: z.lazy(() => SortOrderSchema).optional(),
  nik: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  jabatan: z.lazy(() => SortOrderSchema).optional(),
  organisasiUnit: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  certificateStatus: z.lazy(() => SortOrderSchema).optional(),
  notBeforeDate: z.lazy(() => SortOrderSchema).optional(),
  notAfterDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const FortigateCountOrderByAggregateInputSchema: z.ZodType<Prisma.FortigateCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  tag: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const FortigateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FortigateMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  tag: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const FortigateMinOrderByAggregateInputSchema: z.ZodType<Prisma.FortigateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  tag: z.lazy(() => SortOrderSchema).optional(),
  path: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CsirtCategoryRelationFilterSchema: z.ZodType<Prisma.CsirtCategoryRelationFilter> = z.object({
  is: z.lazy(() => CsirtCategoryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CsirtCategoryWhereInputSchema).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable(),
}).strict();

export const CsirtPostCountOrderByAggregateInputSchema: z.ZodType<Prisma.CsirtPostCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CsirtPostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CsirtPostMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CsirtPostMinOrderByAggregateInputSchema: z.ZodType<Prisma.CsirtPostMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CsirtCategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CsirtCategoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CsirtCategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CsirtCategoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const CsirtCategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CsirtCategoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const HelpdeskCategoryRelationFilterSchema: z.ZodType<Prisma.HelpdeskCategoryRelationFilter> = z.object({
  is: z.lazy(() => HelpdeskCategoryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => HelpdeskCategoryWhereInputSchema).optional().nullable(),
}).strict();

export const HelpdeskCountOrderByAggregateInputSchema: z.ZodType<Prisma.HelpdeskCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const HelpdeskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HelpdeskMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const HelpdeskMinOrderByAggregateInputSchema: z.ZodType<Prisma.HelpdeskMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
}).strict();

export const HelpdeskCategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.HelpdeskCategoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const HelpdeskCategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HelpdeskCategoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const HelpdeskCategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.HelpdeskCategoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiCategoryRelationFilterSchema: z.ZodType<Prisma.IndeksKamiCategoryRelationFilter> = z.object({
  is: z.lazy(() => IndeksKamiCategoryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => IndeksKamiCategoryWhereInputSchema).optional().nullable(),
}).strict();

export const IndeksKamiDataListRelationFilterSchema: z.ZodType<Prisma.IndeksKamiDataListRelationFilter> = z.object({
  every: z.lazy(() => IndeksKamiDataWhereInputSchema).optional(),
  some: z.lazy(() => IndeksKamiDataWhereInputSchema).optional(),
  none: z.lazy(() => IndeksKamiDataWhereInputSchema).optional(),
}).strict();

export const IndeksKamiDataOrderByRelationAggregateInputSchema: z.ZodType<Prisma.IndeksKamiDataOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiCountOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  summaryAsesi: z.lazy(() => SortOrderSchema).optional(),
  summaryAsesor: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  asesiId: z.lazy(() => SortOrderSchema).optional(),
  asesorId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  asesiId: z.lazy(() => SortOrderSchema).optional(),
  asesorId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiMinOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  unitId: z.lazy(() => SortOrderSchema).optional(),
  asesiId: z.lazy(() => SortOrderSchema).optional(),
  asesorId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const IndeksKamiCategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiCategoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiCategoryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiCategoryAvgOrderByAggregateInput> = z.object({
  code: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiCategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiCategoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiCategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiCategoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiCategorySumOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiCategorySumOrderByAggregateInput> = z.object({
  code: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IndeksKamiCriteriaCountOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  tag: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  require: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiCriteriaAvgOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaAvgOrderByAggregateInput> = z.object({
  code: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiCriteriaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  tag: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiCriteriaMinOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  tag: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiCriteriaSumOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiCriteriaSumOrderByAggregateInput> = z.object({
  code: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IndeksKamiTemplateCountOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiTemplateCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  header: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => SortOrderSchema).optional(),
  step: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  example: z.lazy(() => SortOrderSchema).optional(),
  options: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiTemplateAvgOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiTemplateAvgOrderByAggregateInput> = z.object({
  category: z.lazy(() => SortOrderSchema).optional(),
  step: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiTemplateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiTemplateMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  header: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => SortOrderSchema).optional(),
  step: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  example: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiTemplateMinOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiTemplateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  header: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => SortOrderSchema).optional(),
  step: z.lazy(() => SortOrderSchema).optional(),
  question: z.lazy(() => SortOrderSchema).optional(),
  example: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiTemplateSumOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiTemplateSumOrderByAggregateInput> = z.object({
  category: z.lazy(() => SortOrderSchema).optional(),
  step: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
}).strict();

export const IndeksKamiRelationFilterSchema: z.ZodType<Prisma.IndeksKamiRelationFilter> = z.object({
  is: z.lazy(() => IndeksKamiWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => IndeksKamiWhereInputSchema).optional().nullable(),
}).strict();

export const IndeksKamiTemplateRelationFilterSchema: z.ZodType<Prisma.IndeksKamiTemplateRelationFilter> = z.object({
  is: z.lazy(() => IndeksKamiTemplateWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => IndeksKamiTemplateWhereInputSchema).optional().nullable(),
}).strict();

export const IndeksKamiDataCountOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiDataCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  file: z.lazy(() => SortOrderSchema).optional(),
  filename: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => SortOrderSchema).optional(),
  step: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  indeksId: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiDataAvgOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiDataAvgOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  step: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiDataMaxOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiDataMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  file: z.lazy(() => SortOrderSchema).optional(),
  filename: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => SortOrderSchema).optional(),
  step: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  indeksId: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiDataMinOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiDataMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  file: z.lazy(() => SortOrderSchema).optional(),
  filename: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => SortOrderSchema).optional(),
  step: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  indeksId: z.lazy(() => SortOrderSchema).optional(),
  templateId: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const IndeksKamiDataSumOrderByAggregateInputSchema: z.ZodType<Prisma.IndeksKamiDataSumOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => SortOrderSchema).optional(),
  step: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const RoleCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.RoleCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutUserInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional(),
}).strict();

export const UnitCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.UnitCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UnitCreateWithoutUserInputSchema),z.lazy(() => UnitUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UnitCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => UnitWhereUniqueInputSchema).optional(),
}).strict();

export const IndeksKamiCreateNestedManyWithoutAsesiInputSchema: z.ZodType<Prisma.IndeksKamiCreateNestedManyWithoutAsesiInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutAsesiInputSchema),z.lazy(() => IndeksKamiCreateWithoutAsesiInputSchema).array(),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesiInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesiInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiCreateOrConnectWithoutAsesiInputSchema),z.lazy(() => IndeksKamiCreateOrConnectWithoutAsesiInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiCreateManyAsesiInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiCreateNestedManyWithoutAsesorInputSchema: z.ZodType<Prisma.IndeksKamiCreateNestedManyWithoutAsesorInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutAsesorInputSchema),z.lazy(() => IndeksKamiCreateWithoutAsesorInputSchema).array(),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesorInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiCreateOrConnectWithoutAsesorInputSchema),z.lazy(() => IndeksKamiCreateOrConnectWithoutAsesorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiCreateManyAsesorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DevicesCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.DevicesCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => DevicesCreateWithoutUserInputSchema),z.lazy(() => DevicesUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DevicesCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => DevicesWhereUniqueInputSchema).optional(),
}).strict();

export const CsirtPostCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CsirtPostCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => CsirtPostCreateWithoutAuthorInputSchema),z.lazy(() => CsirtPostCreateWithoutAuthorInputSchema).array(),z.lazy(() => CsirtPostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CsirtPostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CsirtPostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CsirtPostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CsirtPostCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiUncheckedCreateNestedManyWithoutAsesiInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedCreateNestedManyWithoutAsesiInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutAsesiInputSchema),z.lazy(() => IndeksKamiCreateWithoutAsesiInputSchema).array(),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesiInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesiInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiCreateOrConnectWithoutAsesiInputSchema),z.lazy(() => IndeksKamiCreateOrConnectWithoutAsesiInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiCreateManyAsesiInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiUncheckedCreateNestedManyWithoutAsesorInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedCreateNestedManyWithoutAsesorInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutAsesorInputSchema),z.lazy(() => IndeksKamiCreateWithoutAsesorInputSchema).array(),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesorInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiCreateOrConnectWithoutAsesorInputSchema),z.lazy(() => IndeksKamiCreateOrConnectWithoutAsesorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiCreateManyAsesorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CsirtPostUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.CsirtPostUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => CsirtPostCreateWithoutAuthorInputSchema),z.lazy(() => CsirtPostCreateWithoutAuthorInputSchema).array(),z.lazy(() => CsirtPostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CsirtPostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CsirtPostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CsirtPostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CsirtPostCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable(),
}).strict();

export const RoleUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.RoleUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutUserInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => RoleUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoleUpdateWithoutUserInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const UnitUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.UnitUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UnitCreateWithoutUserInputSchema),z.lazy(() => UnitUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UnitCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => UnitUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UnitWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UnitUpdateWithoutUserInputSchema),z.lazy(() => UnitUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const IndeksKamiUpdateManyWithoutAsesiNestedInputSchema: z.ZodType<Prisma.IndeksKamiUpdateManyWithoutAsesiNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutAsesiInputSchema),z.lazy(() => IndeksKamiCreateWithoutAsesiInputSchema).array(),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesiInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesiInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiCreateOrConnectWithoutAsesiInputSchema),z.lazy(() => IndeksKamiCreateOrConnectWithoutAsesiInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IndeksKamiUpsertWithWhereUniqueWithoutAsesiInputSchema),z.lazy(() => IndeksKamiUpsertWithWhereUniqueWithoutAsesiInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiCreateManyAsesiInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IndeksKamiUpdateWithWhereUniqueWithoutAsesiInputSchema),z.lazy(() => IndeksKamiUpdateWithWhereUniqueWithoutAsesiInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IndeksKamiUpdateManyWithWhereWithoutAsesiInputSchema),z.lazy(() => IndeksKamiUpdateManyWithWhereWithoutAsesiInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IndeksKamiScalarWhereInputSchema),z.lazy(() => IndeksKamiScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiUpdateManyWithoutAsesorNestedInputSchema: z.ZodType<Prisma.IndeksKamiUpdateManyWithoutAsesorNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutAsesorInputSchema),z.lazy(() => IndeksKamiCreateWithoutAsesorInputSchema).array(),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesorInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiCreateOrConnectWithoutAsesorInputSchema),z.lazy(() => IndeksKamiCreateOrConnectWithoutAsesorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IndeksKamiUpsertWithWhereUniqueWithoutAsesorInputSchema),z.lazy(() => IndeksKamiUpsertWithWhereUniqueWithoutAsesorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiCreateManyAsesorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IndeksKamiUpdateWithWhereUniqueWithoutAsesorInputSchema),z.lazy(() => IndeksKamiUpdateWithWhereUniqueWithoutAsesorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IndeksKamiUpdateManyWithWhereWithoutAsesorInputSchema),z.lazy(() => IndeksKamiUpdateManyWithWhereWithoutAsesorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IndeksKamiScalarWhereInputSchema),z.lazy(() => IndeksKamiScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DevicesUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.DevicesUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => DevicesCreateWithoutUserInputSchema),z.lazy(() => DevicesUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DevicesCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => DevicesUpsertWithoutUserInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => DevicesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DevicesUpdateWithoutUserInputSchema),z.lazy(() => DevicesUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const CsirtPostUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CsirtPostUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => CsirtPostCreateWithoutAuthorInputSchema),z.lazy(() => CsirtPostCreateWithoutAuthorInputSchema).array(),z.lazy(() => CsirtPostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CsirtPostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CsirtPostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CsirtPostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CsirtPostUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CsirtPostUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CsirtPostCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CsirtPostUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CsirtPostUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CsirtPostUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => CsirtPostUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CsirtPostScalarWhereInputSchema),z.lazy(() => CsirtPostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiUncheckedUpdateManyWithoutAsesiNestedInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedUpdateManyWithoutAsesiNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutAsesiInputSchema),z.lazy(() => IndeksKamiCreateWithoutAsesiInputSchema).array(),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesiInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesiInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiCreateOrConnectWithoutAsesiInputSchema),z.lazy(() => IndeksKamiCreateOrConnectWithoutAsesiInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IndeksKamiUpsertWithWhereUniqueWithoutAsesiInputSchema),z.lazy(() => IndeksKamiUpsertWithWhereUniqueWithoutAsesiInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiCreateManyAsesiInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IndeksKamiUpdateWithWhereUniqueWithoutAsesiInputSchema),z.lazy(() => IndeksKamiUpdateWithWhereUniqueWithoutAsesiInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IndeksKamiUpdateManyWithWhereWithoutAsesiInputSchema),z.lazy(() => IndeksKamiUpdateManyWithWhereWithoutAsesiInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IndeksKamiScalarWhereInputSchema),z.lazy(() => IndeksKamiScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiUncheckedUpdateManyWithoutAsesorNestedInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedUpdateManyWithoutAsesorNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutAsesorInputSchema),z.lazy(() => IndeksKamiCreateWithoutAsesorInputSchema).array(),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesorInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiCreateOrConnectWithoutAsesorInputSchema),z.lazy(() => IndeksKamiCreateOrConnectWithoutAsesorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IndeksKamiUpsertWithWhereUniqueWithoutAsesorInputSchema),z.lazy(() => IndeksKamiUpsertWithWhereUniqueWithoutAsesorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiCreateManyAsesorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IndeksKamiUpdateWithWhereUniqueWithoutAsesorInputSchema),z.lazy(() => IndeksKamiUpdateWithWhereUniqueWithoutAsesorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IndeksKamiUpdateManyWithWhereWithoutAsesorInputSchema),z.lazy(() => IndeksKamiUpdateManyWithWhereWithoutAsesorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IndeksKamiScalarWhereInputSchema),z.lazy(() => IndeksKamiScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CsirtPostUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.CsirtPostUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => CsirtPostCreateWithoutAuthorInputSchema),z.lazy(() => CsirtPostCreateWithoutAuthorInputSchema).array(),z.lazy(() => CsirtPostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => CsirtPostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CsirtPostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => CsirtPostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CsirtPostUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CsirtPostUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CsirtPostCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CsirtPostUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => CsirtPostUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CsirtPostUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => CsirtPostUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CsirtPostScalarWhereInputSchema),z.lazy(() => CsirtPostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserCreateWithoutRoleInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutUnitInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutUnitInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUnitInputSchema),z.lazy(() => UserCreateWithoutUnitInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutUnitInputSchema),z.lazy(() => UserUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutUnitInputSchema),z.lazy(() => UserCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SiteCreateNestedManyWithoutUnitInputSchema: z.ZodType<Prisma.SiteCreateNestedManyWithoutUnitInput> = z.object({
  create: z.union([ z.lazy(() => SiteCreateWithoutUnitInputSchema),z.lazy(() => SiteCreateWithoutUnitInputSchema).array(),z.lazy(() => SiteUncheckedCreateWithoutUnitInputSchema),z.lazy(() => SiteUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SiteCreateOrConnectWithoutUnitInputSchema),z.lazy(() => SiteCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SiteCreateManyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SiteWhereUniqueInputSchema),z.lazy(() => SiteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CertificateCreateNestedManyWithoutUnitInputSchema: z.ZodType<Prisma.CertificateCreateNestedManyWithoutUnitInput> = z.object({
  create: z.union([ z.lazy(() => CertificateCreateWithoutUnitInputSchema),z.lazy(() => CertificateCreateWithoutUnitInputSchema).array(),z.lazy(() => CertificateUncheckedCreateWithoutUnitInputSchema),z.lazy(() => CertificateUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CertificateCreateOrConnectWithoutUnitInputSchema),z.lazy(() => CertificateCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CertificateCreateManyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CertificateWhereUniqueInputSchema),z.lazy(() => CertificateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiCreateNestedManyWithoutUnitInputSchema: z.ZodType<Prisma.IndeksKamiCreateNestedManyWithoutUnitInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutUnitInputSchema),z.lazy(() => IndeksKamiCreateWithoutUnitInputSchema).array(),z.lazy(() => IndeksKamiUncheckedCreateWithoutUnitInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiCreateOrConnectWithoutUnitInputSchema),z.lazy(() => IndeksKamiCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiCreateManyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HelpdeskCreateNestedManyWithoutUnitInputSchema: z.ZodType<Prisma.HelpdeskCreateNestedManyWithoutUnitInput> = z.object({
  create: z.union([ z.lazy(() => HelpdeskCreateWithoutUnitInputSchema),z.lazy(() => HelpdeskCreateWithoutUnitInputSchema).array(),z.lazy(() => HelpdeskUncheckedCreateWithoutUnitInputSchema),z.lazy(() => HelpdeskUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HelpdeskCreateOrConnectWithoutUnitInputSchema),z.lazy(() => HelpdeskCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HelpdeskCreateManyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutUnitInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutUnitInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUnitInputSchema),z.lazy(() => UserCreateWithoutUnitInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutUnitInputSchema),z.lazy(() => UserUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutUnitInputSchema),z.lazy(() => UserCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SiteUncheckedCreateNestedManyWithoutUnitInputSchema: z.ZodType<Prisma.SiteUncheckedCreateNestedManyWithoutUnitInput> = z.object({
  create: z.union([ z.lazy(() => SiteCreateWithoutUnitInputSchema),z.lazy(() => SiteCreateWithoutUnitInputSchema).array(),z.lazy(() => SiteUncheckedCreateWithoutUnitInputSchema),z.lazy(() => SiteUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SiteCreateOrConnectWithoutUnitInputSchema),z.lazy(() => SiteCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SiteCreateManyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SiteWhereUniqueInputSchema),z.lazy(() => SiteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CertificateUncheckedCreateNestedManyWithoutUnitInputSchema: z.ZodType<Prisma.CertificateUncheckedCreateNestedManyWithoutUnitInput> = z.object({
  create: z.union([ z.lazy(() => CertificateCreateWithoutUnitInputSchema),z.lazy(() => CertificateCreateWithoutUnitInputSchema).array(),z.lazy(() => CertificateUncheckedCreateWithoutUnitInputSchema),z.lazy(() => CertificateUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CertificateCreateOrConnectWithoutUnitInputSchema),z.lazy(() => CertificateCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CertificateCreateManyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CertificateWhereUniqueInputSchema),z.lazy(() => CertificateWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiUncheckedCreateNestedManyWithoutUnitInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedCreateNestedManyWithoutUnitInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutUnitInputSchema),z.lazy(() => IndeksKamiCreateWithoutUnitInputSchema).array(),z.lazy(() => IndeksKamiUncheckedCreateWithoutUnitInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiCreateOrConnectWithoutUnitInputSchema),z.lazy(() => IndeksKamiCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiCreateManyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HelpdeskUncheckedCreateNestedManyWithoutUnitInputSchema: z.ZodType<Prisma.HelpdeskUncheckedCreateNestedManyWithoutUnitInput> = z.object({
  create: z.union([ z.lazy(() => HelpdeskCreateWithoutUnitInputSchema),z.lazy(() => HelpdeskCreateWithoutUnitInputSchema).array(),z.lazy(() => HelpdeskUncheckedCreateWithoutUnitInputSchema),z.lazy(() => HelpdeskUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HelpdeskCreateOrConnectWithoutUnitInputSchema),z.lazy(() => HelpdeskCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HelpdeskCreateManyUnitInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutUnitNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUnitInputSchema),z.lazy(() => UserCreateWithoutUnitInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutUnitInputSchema),z.lazy(() => UserUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutUnitInputSchema),z.lazy(() => UserCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutUnitInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SiteUpdateManyWithoutUnitNestedInputSchema: z.ZodType<Prisma.SiteUpdateManyWithoutUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => SiteCreateWithoutUnitInputSchema),z.lazy(() => SiteCreateWithoutUnitInputSchema).array(),z.lazy(() => SiteUncheckedCreateWithoutUnitInputSchema),z.lazy(() => SiteUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SiteCreateOrConnectWithoutUnitInputSchema),z.lazy(() => SiteCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SiteUpsertWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => SiteUpsertWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SiteCreateManyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SiteWhereUniqueInputSchema),z.lazy(() => SiteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SiteWhereUniqueInputSchema),z.lazy(() => SiteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SiteWhereUniqueInputSchema),z.lazy(() => SiteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SiteWhereUniqueInputSchema),z.lazy(() => SiteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SiteUpdateWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => SiteUpdateWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SiteUpdateManyWithWhereWithoutUnitInputSchema),z.lazy(() => SiteUpdateManyWithWhereWithoutUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SiteScalarWhereInputSchema),z.lazy(() => SiteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CertificateUpdateManyWithoutUnitNestedInputSchema: z.ZodType<Prisma.CertificateUpdateManyWithoutUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => CertificateCreateWithoutUnitInputSchema),z.lazy(() => CertificateCreateWithoutUnitInputSchema).array(),z.lazy(() => CertificateUncheckedCreateWithoutUnitInputSchema),z.lazy(() => CertificateUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CertificateCreateOrConnectWithoutUnitInputSchema),z.lazy(() => CertificateCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CertificateUpsertWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => CertificateUpsertWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CertificateCreateManyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CertificateWhereUniqueInputSchema),z.lazy(() => CertificateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CertificateWhereUniqueInputSchema),z.lazy(() => CertificateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CertificateWhereUniqueInputSchema),z.lazy(() => CertificateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CertificateWhereUniqueInputSchema),z.lazy(() => CertificateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CertificateUpdateWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => CertificateUpdateWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CertificateUpdateManyWithWhereWithoutUnitInputSchema),z.lazy(() => CertificateUpdateManyWithWhereWithoutUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CertificateScalarWhereInputSchema),z.lazy(() => CertificateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiUpdateManyWithoutUnitNestedInputSchema: z.ZodType<Prisma.IndeksKamiUpdateManyWithoutUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutUnitInputSchema),z.lazy(() => IndeksKamiCreateWithoutUnitInputSchema).array(),z.lazy(() => IndeksKamiUncheckedCreateWithoutUnitInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiCreateOrConnectWithoutUnitInputSchema),z.lazy(() => IndeksKamiCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IndeksKamiUpsertWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => IndeksKamiUpsertWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiCreateManyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IndeksKamiUpdateWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => IndeksKamiUpdateWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IndeksKamiUpdateManyWithWhereWithoutUnitInputSchema),z.lazy(() => IndeksKamiUpdateManyWithWhereWithoutUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IndeksKamiScalarWhereInputSchema),z.lazy(() => IndeksKamiScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HelpdeskUpdateManyWithoutUnitNestedInputSchema: z.ZodType<Prisma.HelpdeskUpdateManyWithoutUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => HelpdeskCreateWithoutUnitInputSchema),z.lazy(() => HelpdeskCreateWithoutUnitInputSchema).array(),z.lazy(() => HelpdeskUncheckedCreateWithoutUnitInputSchema),z.lazy(() => HelpdeskUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HelpdeskCreateOrConnectWithoutUnitInputSchema),z.lazy(() => HelpdeskCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HelpdeskUpsertWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => HelpdeskUpsertWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HelpdeskCreateManyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HelpdeskUpdateWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => HelpdeskUpdateWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HelpdeskUpdateManyWithWhereWithoutUnitInputSchema),z.lazy(() => HelpdeskUpdateManyWithWhereWithoutUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HelpdeskScalarWhereInputSchema),z.lazy(() => HelpdeskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutUnitNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUnitInputSchema),z.lazy(() => UserCreateWithoutUnitInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutUnitInputSchema),z.lazy(() => UserUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutUnitInputSchema),z.lazy(() => UserCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutUnitInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SiteUncheckedUpdateManyWithoutUnitNestedInputSchema: z.ZodType<Prisma.SiteUncheckedUpdateManyWithoutUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => SiteCreateWithoutUnitInputSchema),z.lazy(() => SiteCreateWithoutUnitInputSchema).array(),z.lazy(() => SiteUncheckedCreateWithoutUnitInputSchema),z.lazy(() => SiteUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SiteCreateOrConnectWithoutUnitInputSchema),z.lazy(() => SiteCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SiteUpsertWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => SiteUpsertWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SiteCreateManyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SiteWhereUniqueInputSchema),z.lazy(() => SiteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SiteWhereUniqueInputSchema),z.lazy(() => SiteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SiteWhereUniqueInputSchema),z.lazy(() => SiteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SiteWhereUniqueInputSchema),z.lazy(() => SiteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SiteUpdateWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => SiteUpdateWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SiteUpdateManyWithWhereWithoutUnitInputSchema),z.lazy(() => SiteUpdateManyWithWhereWithoutUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SiteScalarWhereInputSchema),z.lazy(() => SiteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CertificateUncheckedUpdateManyWithoutUnitNestedInputSchema: z.ZodType<Prisma.CertificateUncheckedUpdateManyWithoutUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => CertificateCreateWithoutUnitInputSchema),z.lazy(() => CertificateCreateWithoutUnitInputSchema).array(),z.lazy(() => CertificateUncheckedCreateWithoutUnitInputSchema),z.lazy(() => CertificateUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CertificateCreateOrConnectWithoutUnitInputSchema),z.lazy(() => CertificateCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CertificateUpsertWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => CertificateUpsertWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CertificateCreateManyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CertificateWhereUniqueInputSchema),z.lazy(() => CertificateWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CertificateWhereUniqueInputSchema),z.lazy(() => CertificateWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CertificateWhereUniqueInputSchema),z.lazy(() => CertificateWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CertificateWhereUniqueInputSchema),z.lazy(() => CertificateWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CertificateUpdateWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => CertificateUpdateWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CertificateUpdateManyWithWhereWithoutUnitInputSchema),z.lazy(() => CertificateUpdateManyWithWhereWithoutUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CertificateScalarWhereInputSchema),z.lazy(() => CertificateScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiUncheckedUpdateManyWithoutUnitNestedInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedUpdateManyWithoutUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutUnitInputSchema),z.lazy(() => IndeksKamiCreateWithoutUnitInputSchema).array(),z.lazy(() => IndeksKamiUncheckedCreateWithoutUnitInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiCreateOrConnectWithoutUnitInputSchema),z.lazy(() => IndeksKamiCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IndeksKamiUpsertWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => IndeksKamiUpsertWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiCreateManyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IndeksKamiUpdateWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => IndeksKamiUpdateWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IndeksKamiUpdateManyWithWhereWithoutUnitInputSchema),z.lazy(() => IndeksKamiUpdateManyWithWhereWithoutUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IndeksKamiScalarWhereInputSchema),z.lazy(() => IndeksKamiScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HelpdeskUncheckedUpdateManyWithoutUnitNestedInputSchema: z.ZodType<Prisma.HelpdeskUncheckedUpdateManyWithoutUnitNestedInput> = z.object({
  create: z.union([ z.lazy(() => HelpdeskCreateWithoutUnitInputSchema),z.lazy(() => HelpdeskCreateWithoutUnitInputSchema).array(),z.lazy(() => HelpdeskUncheckedCreateWithoutUnitInputSchema),z.lazy(() => HelpdeskUncheckedCreateWithoutUnitInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HelpdeskCreateOrConnectWithoutUnitInputSchema),z.lazy(() => HelpdeskCreateOrConnectWithoutUnitInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HelpdeskUpsertWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => HelpdeskUpsertWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HelpdeskCreateManyUnitInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HelpdeskUpdateWithWhereUniqueWithoutUnitInputSchema),z.lazy(() => HelpdeskUpdateWithWhereUniqueWithoutUnitInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HelpdeskUpdateManyWithWhereWithoutUnitInputSchema),z.lazy(() => HelpdeskUpdateManyWithWhereWithoutUnitInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HelpdeskScalarWhereInputSchema),z.lazy(() => HelpdeskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutDevicesInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutDevicesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDevicesInputSchema),z.lazy(() => UserCreateWithoutDevicesInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutDevicesInputSchema),z.lazy(() => UserCreateOrConnectWithoutDevicesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyDevicesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutDevicesInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutDevicesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDevicesInputSchema),z.lazy(() => UserCreateWithoutDevicesInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutDevicesInputSchema),z.lazy(() => UserCreateOrConnectWithoutDevicesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyDevicesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutDevicesNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutDevicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDevicesInputSchema),z.lazy(() => UserCreateWithoutDevicesInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutDevicesInputSchema),z.lazy(() => UserCreateOrConnectWithoutDevicesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutDevicesInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutDevicesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyDevicesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutDevicesInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutDevicesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutDevicesInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutDevicesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutDevicesNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutDevicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDevicesInputSchema),z.lazy(() => UserCreateWithoutDevicesInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutDevicesInputSchema),z.lazy(() => UserCreateOrConnectWithoutDevicesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutDevicesInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutDevicesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyDevicesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutDevicesInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutDevicesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutDevicesInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutDevicesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SiteAuditCreateNestedManyWithoutSiteInputSchema: z.ZodType<Prisma.SiteAuditCreateNestedManyWithoutSiteInput> = z.object({
  create: z.union([ z.lazy(() => SiteAuditCreateWithoutSiteInputSchema),z.lazy(() => SiteAuditCreateWithoutSiteInputSchema).array(),z.lazy(() => SiteAuditUncheckedCreateWithoutSiteInputSchema),z.lazy(() => SiteAuditUncheckedCreateWithoutSiteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SiteAuditCreateOrConnectWithoutSiteInputSchema),z.lazy(() => SiteAuditCreateOrConnectWithoutSiteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SiteAuditCreateManySiteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SiteAuditWhereUniqueInputSchema),z.lazy(() => SiteAuditWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UnitCreateNestedOneWithoutSiteInputSchema: z.ZodType<Prisma.UnitCreateNestedOneWithoutSiteInput> = z.object({
  create: z.union([ z.lazy(() => UnitCreateWithoutSiteInputSchema),z.lazy(() => UnitUncheckedCreateWithoutSiteInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UnitCreateOrConnectWithoutSiteInputSchema).optional(),
  connect: z.lazy(() => UnitWhereUniqueInputSchema).optional(),
}).strict();

export const SiteAuditUncheckedCreateNestedManyWithoutSiteInputSchema: z.ZodType<Prisma.SiteAuditUncheckedCreateNestedManyWithoutSiteInput> = z.object({
  create: z.union([ z.lazy(() => SiteAuditCreateWithoutSiteInputSchema),z.lazy(() => SiteAuditCreateWithoutSiteInputSchema).array(),z.lazy(() => SiteAuditUncheckedCreateWithoutSiteInputSchema),z.lazy(() => SiteAuditUncheckedCreateWithoutSiteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SiteAuditCreateOrConnectWithoutSiteInputSchema),z.lazy(() => SiteAuditCreateOrConnectWithoutSiteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SiteAuditCreateManySiteInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SiteAuditWhereUniqueInputSchema),z.lazy(() => SiteAuditWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SiteAuditUpdateManyWithoutSiteNestedInputSchema: z.ZodType<Prisma.SiteAuditUpdateManyWithoutSiteNestedInput> = z.object({
  create: z.union([ z.lazy(() => SiteAuditCreateWithoutSiteInputSchema),z.lazy(() => SiteAuditCreateWithoutSiteInputSchema).array(),z.lazy(() => SiteAuditUncheckedCreateWithoutSiteInputSchema),z.lazy(() => SiteAuditUncheckedCreateWithoutSiteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SiteAuditCreateOrConnectWithoutSiteInputSchema),z.lazy(() => SiteAuditCreateOrConnectWithoutSiteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SiteAuditUpsertWithWhereUniqueWithoutSiteInputSchema),z.lazy(() => SiteAuditUpsertWithWhereUniqueWithoutSiteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SiteAuditCreateManySiteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SiteAuditWhereUniqueInputSchema),z.lazy(() => SiteAuditWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SiteAuditWhereUniqueInputSchema),z.lazy(() => SiteAuditWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SiteAuditWhereUniqueInputSchema),z.lazy(() => SiteAuditWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SiteAuditWhereUniqueInputSchema),z.lazy(() => SiteAuditWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SiteAuditUpdateWithWhereUniqueWithoutSiteInputSchema),z.lazy(() => SiteAuditUpdateWithWhereUniqueWithoutSiteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SiteAuditUpdateManyWithWhereWithoutSiteInputSchema),z.lazy(() => SiteAuditUpdateManyWithWhereWithoutSiteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SiteAuditScalarWhereInputSchema),z.lazy(() => SiteAuditScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UnitUpdateOneWithoutSiteNestedInputSchema: z.ZodType<Prisma.UnitUpdateOneWithoutSiteNestedInput> = z.object({
  create: z.union([ z.lazy(() => UnitCreateWithoutSiteInputSchema),z.lazy(() => UnitUncheckedCreateWithoutSiteInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UnitCreateOrConnectWithoutSiteInputSchema).optional(),
  upsert: z.lazy(() => UnitUpsertWithoutSiteInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UnitWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UnitUpdateWithoutSiteInputSchema),z.lazy(() => UnitUncheckedUpdateWithoutSiteInputSchema) ]).optional(),
}).strict();

export const SiteAuditUncheckedUpdateManyWithoutSiteNestedInputSchema: z.ZodType<Prisma.SiteAuditUncheckedUpdateManyWithoutSiteNestedInput> = z.object({
  create: z.union([ z.lazy(() => SiteAuditCreateWithoutSiteInputSchema),z.lazy(() => SiteAuditCreateWithoutSiteInputSchema).array(),z.lazy(() => SiteAuditUncheckedCreateWithoutSiteInputSchema),z.lazy(() => SiteAuditUncheckedCreateWithoutSiteInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SiteAuditCreateOrConnectWithoutSiteInputSchema),z.lazy(() => SiteAuditCreateOrConnectWithoutSiteInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SiteAuditUpsertWithWhereUniqueWithoutSiteInputSchema),z.lazy(() => SiteAuditUpsertWithWhereUniqueWithoutSiteInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SiteAuditCreateManySiteInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SiteAuditWhereUniqueInputSchema),z.lazy(() => SiteAuditWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SiteAuditWhereUniqueInputSchema),z.lazy(() => SiteAuditWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SiteAuditWhereUniqueInputSchema),z.lazy(() => SiteAuditWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SiteAuditWhereUniqueInputSchema),z.lazy(() => SiteAuditWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SiteAuditUpdateWithWhereUniqueWithoutSiteInputSchema),z.lazy(() => SiteAuditUpdateWithWhereUniqueWithoutSiteInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SiteAuditUpdateManyWithWhereWithoutSiteInputSchema),z.lazy(() => SiteAuditUpdateManyWithWhereWithoutSiteInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SiteAuditScalarWhereInputSchema),z.lazy(() => SiteAuditScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SiteCreateNestedOneWithoutSiteAuditInputSchema: z.ZodType<Prisma.SiteCreateNestedOneWithoutSiteAuditInput> = z.object({
  create: z.union([ z.lazy(() => SiteCreateWithoutSiteAuditInputSchema),z.lazy(() => SiteUncheckedCreateWithoutSiteAuditInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SiteCreateOrConnectWithoutSiteAuditInputSchema).optional(),
  connect: z.lazy(() => SiteWhereUniqueInputSchema).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const SiteUpdateOneRequiredWithoutSiteAuditNestedInputSchema: z.ZodType<Prisma.SiteUpdateOneRequiredWithoutSiteAuditNestedInput> = z.object({
  create: z.union([ z.lazy(() => SiteCreateWithoutSiteAuditInputSchema),z.lazy(() => SiteUncheckedCreateWithoutSiteAuditInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SiteCreateOrConnectWithoutSiteAuditInputSchema).optional(),
  upsert: z.lazy(() => SiteUpsertWithoutSiteAuditInputSchema).optional(),
  connect: z.lazy(() => SiteWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SiteUpdateWithoutSiteAuditInputSchema),z.lazy(() => SiteUncheckedUpdateWithoutSiteAuditInputSchema) ]).optional(),
}).strict();

export const UnitCreateNestedOneWithoutCertificateInputSchema: z.ZodType<Prisma.UnitCreateNestedOneWithoutCertificateInput> = z.object({
  create: z.union([ z.lazy(() => UnitCreateWithoutCertificateInputSchema),z.lazy(() => UnitUncheckedCreateWithoutCertificateInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UnitCreateOrConnectWithoutCertificateInputSchema).optional(),
  connect: z.lazy(() => UnitWhereUniqueInputSchema).optional(),
}).strict();

export const UnitUpdateOneWithoutCertificateNestedInputSchema: z.ZodType<Prisma.UnitUpdateOneWithoutCertificateNestedInput> = z.object({
  create: z.union([ z.lazy(() => UnitCreateWithoutCertificateInputSchema),z.lazy(() => UnitUncheckedCreateWithoutCertificateInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UnitCreateOrConnectWithoutCertificateInputSchema).optional(),
  upsert: z.lazy(() => UnitUpsertWithoutCertificateInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UnitWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UnitUpdateWithoutCertificateInputSchema),z.lazy(() => UnitUncheckedUpdateWithoutCertificateInputSchema) ]).optional(),
}).strict();

export const CsirtCategoryCreateNestedOneWithoutCsirtInputSchema: z.ZodType<Prisma.CsirtCategoryCreateNestedOneWithoutCsirtInput> = z.object({
  create: z.union([ z.lazy(() => CsirtCategoryCreateWithoutCsirtInputSchema),z.lazy(() => CsirtCategoryUncheckedCreateWithoutCsirtInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CsirtCategoryCreateOrConnectWithoutCsirtInputSchema).optional(),
  connect: z.lazy(() => CsirtCategoryWhereUniqueInputSchema).optional(),
}).strict();

export const UserCreateNestedOneWithoutCsirtPostInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCsirtPostInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCsirtPostInputSchema),z.lazy(() => UserUncheckedCreateWithoutCsirtPostInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCsirtPostInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const CsirtCategoryUpdateOneWithoutCsirtNestedInputSchema: z.ZodType<Prisma.CsirtCategoryUpdateOneWithoutCsirtNestedInput> = z.object({
  create: z.union([ z.lazy(() => CsirtCategoryCreateWithoutCsirtInputSchema),z.lazy(() => CsirtCategoryUncheckedCreateWithoutCsirtInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CsirtCategoryCreateOrConnectWithoutCsirtInputSchema).optional(),
  upsert: z.lazy(() => CsirtCategoryUpsertWithoutCsirtInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => CsirtCategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CsirtCategoryUpdateWithoutCsirtInputSchema),z.lazy(() => CsirtCategoryUncheckedUpdateWithoutCsirtInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneWithoutCsirtPostNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutCsirtPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCsirtPostInputSchema),z.lazy(() => UserUncheckedCreateWithoutCsirtPostInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCsirtPostInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCsirtPostInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutCsirtPostInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCsirtPostInputSchema) ]).optional(),
}).strict();

export const CsirtPostCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.CsirtPostCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => CsirtPostCreateWithoutCategoryInputSchema),z.lazy(() => CsirtPostCreateWithoutCategoryInputSchema).array(),z.lazy(() => CsirtPostUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => CsirtPostUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CsirtPostCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => CsirtPostCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CsirtPostCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CsirtPostUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.CsirtPostUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => CsirtPostCreateWithoutCategoryInputSchema),z.lazy(() => CsirtPostCreateWithoutCategoryInputSchema).array(),z.lazy(() => CsirtPostUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => CsirtPostUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CsirtPostCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => CsirtPostCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CsirtPostCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CsirtPostUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.CsirtPostUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => CsirtPostCreateWithoutCategoryInputSchema),z.lazy(() => CsirtPostCreateWithoutCategoryInputSchema).array(),z.lazy(() => CsirtPostUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => CsirtPostUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CsirtPostCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => CsirtPostCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CsirtPostUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => CsirtPostUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CsirtPostCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CsirtPostUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => CsirtPostUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CsirtPostUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => CsirtPostUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CsirtPostScalarWhereInputSchema),z.lazy(() => CsirtPostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CsirtPostUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.CsirtPostUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => CsirtPostCreateWithoutCategoryInputSchema),z.lazy(() => CsirtPostCreateWithoutCategoryInputSchema).array(),z.lazy(() => CsirtPostUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => CsirtPostUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CsirtPostCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => CsirtPostCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CsirtPostUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => CsirtPostUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CsirtPostCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CsirtPostWhereUniqueInputSchema),z.lazy(() => CsirtPostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CsirtPostUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => CsirtPostUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CsirtPostUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => CsirtPostUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CsirtPostScalarWhereInputSchema),z.lazy(() => CsirtPostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HelpdeskCategoryCreateNestedOneWithoutHelpdeskInputSchema: z.ZodType<Prisma.HelpdeskCategoryCreateNestedOneWithoutHelpdeskInput> = z.object({
  create: z.union([ z.lazy(() => HelpdeskCategoryCreateWithoutHelpdeskInputSchema),z.lazy(() => HelpdeskCategoryUncheckedCreateWithoutHelpdeskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HelpdeskCategoryCreateOrConnectWithoutHelpdeskInputSchema).optional(),
  connect: z.lazy(() => HelpdeskCategoryWhereUniqueInputSchema).optional(),
}).strict();

export const UnitCreateNestedOneWithoutHelpdeskInputSchema: z.ZodType<Prisma.UnitCreateNestedOneWithoutHelpdeskInput> = z.object({
  create: z.union([ z.lazy(() => UnitCreateWithoutHelpdeskInputSchema),z.lazy(() => UnitUncheckedCreateWithoutHelpdeskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UnitCreateOrConnectWithoutHelpdeskInputSchema).optional(),
  connect: z.lazy(() => UnitWhereUniqueInputSchema).optional(),
}).strict();

export const HelpdeskCategoryUpdateOneWithoutHelpdeskNestedInputSchema: z.ZodType<Prisma.HelpdeskCategoryUpdateOneWithoutHelpdeskNestedInput> = z.object({
  create: z.union([ z.lazy(() => HelpdeskCategoryCreateWithoutHelpdeskInputSchema),z.lazy(() => HelpdeskCategoryUncheckedCreateWithoutHelpdeskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => HelpdeskCategoryCreateOrConnectWithoutHelpdeskInputSchema).optional(),
  upsert: z.lazy(() => HelpdeskCategoryUpsertWithoutHelpdeskInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => HelpdeskCategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => HelpdeskCategoryUpdateWithoutHelpdeskInputSchema),z.lazy(() => HelpdeskCategoryUncheckedUpdateWithoutHelpdeskInputSchema) ]).optional(),
}).strict();

export const UnitUpdateOneRequiredWithoutHelpdeskNestedInputSchema: z.ZodType<Prisma.UnitUpdateOneRequiredWithoutHelpdeskNestedInput> = z.object({
  create: z.union([ z.lazy(() => UnitCreateWithoutHelpdeskInputSchema),z.lazy(() => UnitUncheckedCreateWithoutHelpdeskInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UnitCreateOrConnectWithoutHelpdeskInputSchema).optional(),
  upsert: z.lazy(() => UnitUpsertWithoutHelpdeskInputSchema).optional(),
  connect: z.lazy(() => UnitWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UnitUpdateWithoutHelpdeskInputSchema),z.lazy(() => UnitUncheckedUpdateWithoutHelpdeskInputSchema) ]).optional(),
}).strict();

export const HelpdeskCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.HelpdeskCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => HelpdeskCreateWithoutCategoryInputSchema),z.lazy(() => HelpdeskCreateWithoutCategoryInputSchema).array(),z.lazy(() => HelpdeskUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => HelpdeskUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HelpdeskCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => HelpdeskCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HelpdeskCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HelpdeskUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.HelpdeskUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => HelpdeskCreateWithoutCategoryInputSchema),z.lazy(() => HelpdeskCreateWithoutCategoryInputSchema).array(),z.lazy(() => HelpdeskUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => HelpdeskUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HelpdeskCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => HelpdeskCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HelpdeskCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HelpdeskUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.HelpdeskUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => HelpdeskCreateWithoutCategoryInputSchema),z.lazy(() => HelpdeskCreateWithoutCategoryInputSchema).array(),z.lazy(() => HelpdeskUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => HelpdeskUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HelpdeskCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => HelpdeskCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HelpdeskUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => HelpdeskUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HelpdeskCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HelpdeskUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => HelpdeskUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HelpdeskUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => HelpdeskUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HelpdeskScalarWhereInputSchema),z.lazy(() => HelpdeskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HelpdeskUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.HelpdeskUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => HelpdeskCreateWithoutCategoryInputSchema),z.lazy(() => HelpdeskCreateWithoutCategoryInputSchema).array(),z.lazy(() => HelpdeskUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => HelpdeskUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HelpdeskCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => HelpdeskCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HelpdeskUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => HelpdeskUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HelpdeskCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HelpdeskWhereUniqueInputSchema),z.lazy(() => HelpdeskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HelpdeskUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => HelpdeskUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HelpdeskUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => HelpdeskUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HelpdeskScalarWhereInputSchema),z.lazy(() => HelpdeskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiCategoryCreateNestedOneWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiCategoryCreateNestedOneWithoutIndeksKamiInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCategoryCreateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiCategoryUncheckedCreateWithoutIndeksKamiInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IndeksKamiCategoryCreateOrConnectWithoutIndeksKamiInputSchema).optional(),
  connect: z.lazy(() => IndeksKamiCategoryWhereUniqueInputSchema).optional(),
}).strict();

export const UnitCreateNestedOneWithoutAsesiInputSchema: z.ZodType<Prisma.UnitCreateNestedOneWithoutAsesiInput> = z.object({
  create: z.union([ z.lazy(() => UnitCreateWithoutAsesiInputSchema),z.lazy(() => UnitUncheckedCreateWithoutAsesiInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UnitCreateOrConnectWithoutAsesiInputSchema).optional(),
  connect: z.lazy(() => UnitWhereUniqueInputSchema).optional(),
}).strict();

export const UserCreateNestedOneWithoutAsesiInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAsesiInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAsesiInputSchema),z.lazy(() => UserUncheckedCreateWithoutAsesiInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAsesiInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const UserCreateNestedOneWithoutAsesorInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAsesorInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAsesorInputSchema),z.lazy(() => UserUncheckedCreateWithoutAsesorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAsesorInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const IndeksKamiDataCreateNestedManyWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiDataCreateNestedManyWithoutIndeksKamiInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiDataCreateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataCreateWithoutIndeksKamiInputSchema).array(),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutIndeksKamiInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiDataCreateOrConnectWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataCreateOrConnectWithoutIndeksKamiInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiDataCreateManyIndeksKamiInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiDataUncheckedCreateNestedManyWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiDataUncheckedCreateNestedManyWithoutIndeksKamiInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiDataCreateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataCreateWithoutIndeksKamiInputSchema).array(),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutIndeksKamiInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiDataCreateOrConnectWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataCreateOrConnectWithoutIndeksKamiInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiDataCreateManyIndeksKamiInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiCategoryUpdateOneWithoutIndeksKamiNestedInputSchema: z.ZodType<Prisma.IndeksKamiCategoryUpdateOneWithoutIndeksKamiNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCategoryCreateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiCategoryUncheckedCreateWithoutIndeksKamiInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IndeksKamiCategoryCreateOrConnectWithoutIndeksKamiInputSchema).optional(),
  upsert: z.lazy(() => IndeksKamiCategoryUpsertWithoutIndeksKamiInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => IndeksKamiCategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => IndeksKamiCategoryUpdateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiCategoryUncheckedUpdateWithoutIndeksKamiInputSchema) ]).optional(),
}).strict();

export const UnitUpdateOneWithoutAsesiNestedInputSchema: z.ZodType<Prisma.UnitUpdateOneWithoutAsesiNestedInput> = z.object({
  create: z.union([ z.lazy(() => UnitCreateWithoutAsesiInputSchema),z.lazy(() => UnitUncheckedCreateWithoutAsesiInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UnitCreateOrConnectWithoutAsesiInputSchema).optional(),
  upsert: z.lazy(() => UnitUpsertWithoutAsesiInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UnitWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UnitUpdateWithoutAsesiInputSchema),z.lazy(() => UnitUncheckedUpdateWithoutAsesiInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneWithoutAsesiNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutAsesiNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAsesiInputSchema),z.lazy(() => UserUncheckedCreateWithoutAsesiInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAsesiInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAsesiInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutAsesiInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAsesiInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneWithoutAsesorNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutAsesorNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAsesorInputSchema),z.lazy(() => UserUncheckedCreateWithoutAsesorInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAsesorInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAsesorInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutAsesorInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAsesorInputSchema) ]).optional(),
}).strict();

export const IndeksKamiDataUpdateManyWithoutIndeksKamiNestedInputSchema: z.ZodType<Prisma.IndeksKamiDataUpdateManyWithoutIndeksKamiNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiDataCreateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataCreateWithoutIndeksKamiInputSchema).array(),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutIndeksKamiInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiDataCreateOrConnectWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataCreateOrConnectWithoutIndeksKamiInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IndeksKamiDataUpsertWithWhereUniqueWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataUpsertWithWhereUniqueWithoutIndeksKamiInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiDataCreateManyIndeksKamiInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IndeksKamiDataUpdateWithWhereUniqueWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataUpdateWithWhereUniqueWithoutIndeksKamiInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IndeksKamiDataUpdateManyWithWhereWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataUpdateManyWithWhereWithoutIndeksKamiInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IndeksKamiDataScalarWhereInputSchema),z.lazy(() => IndeksKamiDataScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiDataUncheckedUpdateManyWithoutIndeksKamiNestedInputSchema: z.ZodType<Prisma.IndeksKamiDataUncheckedUpdateManyWithoutIndeksKamiNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiDataCreateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataCreateWithoutIndeksKamiInputSchema).array(),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutIndeksKamiInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiDataCreateOrConnectWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataCreateOrConnectWithoutIndeksKamiInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IndeksKamiDataUpsertWithWhereUniqueWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataUpsertWithWhereUniqueWithoutIndeksKamiInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiDataCreateManyIndeksKamiInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IndeksKamiDataUpdateWithWhereUniqueWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataUpdateWithWhereUniqueWithoutIndeksKamiInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IndeksKamiDataUpdateManyWithWhereWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataUpdateManyWithWhereWithoutIndeksKamiInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IndeksKamiDataScalarWhereInputSchema),z.lazy(() => IndeksKamiDataScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.IndeksKamiCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutCategoryInputSchema),z.lazy(() => IndeksKamiCreateWithoutCategoryInputSchema).array(),z.lazy(() => IndeksKamiUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => IndeksKamiCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutCategoryInputSchema),z.lazy(() => IndeksKamiCreateWithoutCategoryInputSchema).array(),z.lazy(() => IndeksKamiUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => IndeksKamiCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const IndeksKamiUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.IndeksKamiUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutCategoryInputSchema),z.lazy(() => IndeksKamiCreateWithoutCategoryInputSchema).array(),z.lazy(() => IndeksKamiUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => IndeksKamiCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IndeksKamiUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => IndeksKamiUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IndeksKamiUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => IndeksKamiUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IndeksKamiUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => IndeksKamiUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IndeksKamiScalarWhereInputSchema),z.lazy(() => IndeksKamiScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutCategoryInputSchema),z.lazy(() => IndeksKamiCreateWithoutCategoryInputSchema).array(),z.lazy(() => IndeksKamiUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => IndeksKamiCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IndeksKamiUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => IndeksKamiUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiWhereUniqueInputSchema),z.lazy(() => IndeksKamiWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IndeksKamiUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => IndeksKamiUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IndeksKamiUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => IndeksKamiUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IndeksKamiScalarWhereInputSchema),z.lazy(() => IndeksKamiScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const IndeksKamiDataCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.IndeksKamiDataCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiDataCreateWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataCreateWithoutTemplateInputSchema).array(),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiDataCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiDataCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiDataUncheckedCreateNestedManyWithoutTemplateInputSchema: z.ZodType<Prisma.IndeksKamiDataUncheckedCreateNestedManyWithoutTemplateInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiDataCreateWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataCreateWithoutTemplateInputSchema).array(),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiDataCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiDataCreateManyTemplateInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const IndeksKamiDataUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.IndeksKamiDataUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiDataCreateWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataCreateWithoutTemplateInputSchema).array(),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiDataCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IndeksKamiDataUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiDataCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IndeksKamiDataUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IndeksKamiDataUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IndeksKamiDataScalarWhereInputSchema),z.lazy(() => IndeksKamiDataScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiDataUncheckedUpdateManyWithoutTemplateNestedInputSchema: z.ZodType<Prisma.IndeksKamiDataUncheckedUpdateManyWithoutTemplateNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiDataCreateWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataCreateWithoutTemplateInputSchema).array(),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutTemplateInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => IndeksKamiDataCreateOrConnectWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataCreateOrConnectWithoutTemplateInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => IndeksKamiDataUpsertWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataUpsertWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  createMany: z.lazy(() => IndeksKamiDataCreateManyTemplateInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),z.lazy(() => IndeksKamiDataWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => IndeksKamiDataUpdateWithWhereUniqueWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataUpdateWithWhereUniqueWithoutTemplateInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => IndeksKamiDataUpdateManyWithWhereWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataUpdateManyWithWhereWithoutTemplateInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => IndeksKamiDataScalarWhereInputSchema),z.lazy(() => IndeksKamiDataScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IndeksKamiCreateNestedOneWithoutResultInputSchema: z.ZodType<Prisma.IndeksKamiCreateNestedOneWithoutResultInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutResultInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutResultInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IndeksKamiCreateOrConnectWithoutResultInputSchema).optional(),
  connect: z.lazy(() => IndeksKamiWhereUniqueInputSchema).optional(),
}).strict();

export const IndeksKamiTemplateCreateNestedOneWithoutResultInputSchema: z.ZodType<Prisma.IndeksKamiTemplateCreateNestedOneWithoutResultInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiTemplateCreateWithoutResultInputSchema),z.lazy(() => IndeksKamiTemplateUncheckedCreateWithoutResultInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IndeksKamiTemplateCreateOrConnectWithoutResultInputSchema).optional(),
  connect: z.lazy(() => IndeksKamiTemplateWhereUniqueInputSchema).optional(),
}).strict();

export const IndeksKamiUpdateOneWithoutResultNestedInputSchema: z.ZodType<Prisma.IndeksKamiUpdateOneWithoutResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutResultInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutResultInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IndeksKamiCreateOrConnectWithoutResultInputSchema).optional(),
  upsert: z.lazy(() => IndeksKamiUpsertWithoutResultInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => IndeksKamiWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => IndeksKamiUpdateWithoutResultInputSchema),z.lazy(() => IndeksKamiUncheckedUpdateWithoutResultInputSchema) ]).optional(),
}).strict();

export const IndeksKamiTemplateUpdateOneWithoutResultNestedInputSchema: z.ZodType<Prisma.IndeksKamiTemplateUpdateOneWithoutResultNestedInput> = z.object({
  create: z.union([ z.lazy(() => IndeksKamiTemplateCreateWithoutResultInputSchema),z.lazy(() => IndeksKamiTemplateUncheckedCreateWithoutResultInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => IndeksKamiTemplateCreateOrConnectWithoutResultInputSchema).optional(),
  upsert: z.lazy(() => IndeksKamiTemplateUpsertWithoutResultInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => IndeksKamiTemplateWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => IndeksKamiTemplateUpdateWithoutResultInputSchema),z.lazy(() => IndeksKamiTemplateUncheckedUpdateWithoutResultInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
}).strict();

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
  path: z.string().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: z.union([ InputJsonValue,z.lazy(() => JsonNullValueFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
}).strict();

export const RoleCreateWithoutUserInputSchema: z.ZodType<Prisma.RoleCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  permissions: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
}).strict();

export const RoleUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RoleUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  permissions: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
}).strict();

export const RoleCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RoleCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoleCreateWithoutUserInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UnitCreateWithoutUserInputSchema: z.ZodType<Prisma.UnitCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  Site: z.lazy(() => SiteCreateNestedManyWithoutUnitInputSchema).optional(),
  Certificate: z.lazy(() => CertificateCreateNestedManyWithoutUnitInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiCreateNestedManyWithoutUnitInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskCreateNestedManyWithoutUnitInputSchema).optional(),
}).strict();

export const UnitUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UnitUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  Site: z.lazy(() => SiteUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Certificate: z.lazy(() => CertificateUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
}).strict();

export const UnitCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UnitCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UnitCreateWithoutUserInputSchema),z.lazy(() => UnitUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const IndeksKamiCreateWithoutAsesiInputSchema: z.ZodType<Prisma.IndeksKamiCreateWithoutAsesiInput> = z.object({
  id: z.string().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  category: z.lazy(() => IndeksKamiCategoryCreateNestedOneWithoutIndeksKamiInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutAsesiInputSchema).optional(),
  asesor: z.lazy(() => UserCreateNestedOneWithoutAsesorInputSchema).optional(),
  result: z.lazy(() => IndeksKamiDataCreateNestedManyWithoutIndeksKamiInputSchema).optional(),
}).strict();

export const IndeksKamiUncheckedCreateWithoutAsesiInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedCreateWithoutAsesiInput> = z.object({
  id: z.string().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  unitId: z.string().optional().nullable(),
  asesorId: z.string().optional().nullable(),
  result: z.lazy(() => IndeksKamiDataUncheckedCreateNestedManyWithoutIndeksKamiInputSchema).optional(),
}).strict();

export const IndeksKamiCreateOrConnectWithoutAsesiInputSchema: z.ZodType<Prisma.IndeksKamiCreateOrConnectWithoutAsesiInput> = z.object({
  where: z.lazy(() => IndeksKamiWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutAsesiInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesiInputSchema) ]),
}).strict();

export const IndeksKamiCreateManyAsesiInputEnvelopeSchema: z.ZodType<Prisma.IndeksKamiCreateManyAsesiInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => IndeksKamiCreateManyAsesiInputSchema),z.lazy(() => IndeksKamiCreateManyAsesiInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const IndeksKamiCreateWithoutAsesorInputSchema: z.ZodType<Prisma.IndeksKamiCreateWithoutAsesorInput> = z.object({
  id: z.string().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  category: z.lazy(() => IndeksKamiCategoryCreateNestedOneWithoutIndeksKamiInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutAsesiInputSchema).optional(),
  asesi: z.lazy(() => UserCreateNestedOneWithoutAsesiInputSchema).optional(),
  result: z.lazy(() => IndeksKamiDataCreateNestedManyWithoutIndeksKamiInputSchema).optional(),
}).strict();

export const IndeksKamiUncheckedCreateWithoutAsesorInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedCreateWithoutAsesorInput> = z.object({
  id: z.string().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  unitId: z.string().optional().nullable(),
  asesiId: z.string(),
  result: z.lazy(() => IndeksKamiDataUncheckedCreateNestedManyWithoutIndeksKamiInputSchema).optional(),
}).strict();

export const IndeksKamiCreateOrConnectWithoutAsesorInputSchema: z.ZodType<Prisma.IndeksKamiCreateOrConnectWithoutAsesorInput> = z.object({
  where: z.lazy(() => IndeksKamiWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutAsesorInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesorInputSchema) ]),
}).strict();

export const IndeksKamiCreateManyAsesorInputEnvelopeSchema: z.ZodType<Prisma.IndeksKamiCreateManyAsesorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => IndeksKamiCreateManyAsesorInputSchema),z.lazy(() => IndeksKamiCreateManyAsesorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const DevicesCreateWithoutUserInputSchema: z.ZodType<Prisma.DevicesCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
}).strict();

export const DevicesUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.DevicesUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
}).strict();

export const DevicesCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.DevicesCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => DevicesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DevicesCreateWithoutUserInputSchema),z.lazy(() => DevicesUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CsirtPostCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CsirtPostCreateWithoutAuthorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  thumbnail: z.string().optional().nullable(),
  type: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  category: z.lazy(() => CsirtCategoryCreateNestedOneWithoutCsirtInputSchema).optional(),
}).strict();

export const CsirtPostUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.CsirtPostUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  thumbnail: z.string().optional().nullable(),
  type: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
}).strict();

export const CsirtPostCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.CsirtPostCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => CsirtPostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CsirtPostCreateWithoutAuthorInputSchema),z.lazy(() => CsirtPostUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const CsirtPostCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.CsirtPostCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CsirtPostCreateManyAuthorInputSchema),z.lazy(() => CsirtPostCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const RoleUpsertWithoutUserInputSchema: z.ZodType<Prisma.RoleUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => RoleUpdateWithoutUserInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RoleCreateWithoutUserInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RoleUpdateWithoutUserInputSchema: z.ZodType<Prisma.RoleUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RoleUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  permissions: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UnitUpsertWithoutUserInputSchema: z.ZodType<Prisma.UnitUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => UnitUpdateWithoutUserInputSchema),z.lazy(() => UnitUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UnitCreateWithoutUserInputSchema),z.lazy(() => UnitUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UnitUpdateWithoutUserInputSchema: z.ZodType<Prisma.UnitUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Site: z.lazy(() => SiteUpdateManyWithoutUnitNestedInputSchema).optional(),
  Certificate: z.lazy(() => CertificateUpdateManyWithoutUnitNestedInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUpdateManyWithoutUnitNestedInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskUpdateManyWithoutUnitNestedInputSchema).optional(),
}).strict();

export const UnitUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UnitUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Site: z.lazy(() => SiteUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Certificate: z.lazy(() => CertificateUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
}).strict();

export const IndeksKamiUpsertWithWhereUniqueWithoutAsesiInputSchema: z.ZodType<Prisma.IndeksKamiUpsertWithWhereUniqueWithoutAsesiInput> = z.object({
  where: z.lazy(() => IndeksKamiWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => IndeksKamiUpdateWithoutAsesiInputSchema),z.lazy(() => IndeksKamiUncheckedUpdateWithoutAsesiInputSchema) ]),
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutAsesiInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesiInputSchema) ]),
}).strict();

export const IndeksKamiUpdateWithWhereUniqueWithoutAsesiInputSchema: z.ZodType<Prisma.IndeksKamiUpdateWithWhereUniqueWithoutAsesiInput> = z.object({
  where: z.lazy(() => IndeksKamiWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => IndeksKamiUpdateWithoutAsesiInputSchema),z.lazy(() => IndeksKamiUncheckedUpdateWithoutAsesiInputSchema) ]),
}).strict();

export const IndeksKamiUpdateManyWithWhereWithoutAsesiInputSchema: z.ZodType<Prisma.IndeksKamiUpdateManyWithWhereWithoutAsesiInput> = z.object({
  where: z.lazy(() => IndeksKamiScalarWhereInputSchema),
  data: z.union([ z.lazy(() => IndeksKamiUpdateManyMutationInputSchema),z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutAsesiInputSchema) ]),
}).strict();

export const IndeksKamiScalarWhereInputSchema: z.ZodType<Prisma.IndeksKamiScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IndeksKamiScalarWhereInputSchema),z.lazy(() => IndeksKamiScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndeksKamiScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndeksKamiScalarWhereInputSchema),z.lazy(() => IndeksKamiScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  scope: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  summaryAsesi: z.lazy(() => JsonNullableFilterSchema).optional(),
  summaryAsesor: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  unitId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  asesiId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  asesorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const IndeksKamiUpsertWithWhereUniqueWithoutAsesorInputSchema: z.ZodType<Prisma.IndeksKamiUpsertWithWhereUniqueWithoutAsesorInput> = z.object({
  where: z.lazy(() => IndeksKamiWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => IndeksKamiUpdateWithoutAsesorInputSchema),z.lazy(() => IndeksKamiUncheckedUpdateWithoutAsesorInputSchema) ]),
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutAsesorInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutAsesorInputSchema) ]),
}).strict();

export const IndeksKamiUpdateWithWhereUniqueWithoutAsesorInputSchema: z.ZodType<Prisma.IndeksKamiUpdateWithWhereUniqueWithoutAsesorInput> = z.object({
  where: z.lazy(() => IndeksKamiWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => IndeksKamiUpdateWithoutAsesorInputSchema),z.lazy(() => IndeksKamiUncheckedUpdateWithoutAsesorInputSchema) ]),
}).strict();

export const IndeksKamiUpdateManyWithWhereWithoutAsesorInputSchema: z.ZodType<Prisma.IndeksKamiUpdateManyWithWhereWithoutAsesorInput> = z.object({
  where: z.lazy(() => IndeksKamiScalarWhereInputSchema),
  data: z.union([ z.lazy(() => IndeksKamiUpdateManyMutationInputSchema),z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutAsesorInputSchema) ]),
}).strict();

export const DevicesUpsertWithoutUserInputSchema: z.ZodType<Prisma.DevicesUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => DevicesUpdateWithoutUserInputSchema),z.lazy(() => DevicesUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => DevicesCreateWithoutUserInputSchema),z.lazy(() => DevicesUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const DevicesUpdateWithoutUserInputSchema: z.ZodType<Prisma.DevicesUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const DevicesUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.DevicesUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CsirtPostUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CsirtPostUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => CsirtPostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CsirtPostUpdateWithoutAuthorInputSchema),z.lazy(() => CsirtPostUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => CsirtPostCreateWithoutAuthorInputSchema),z.lazy(() => CsirtPostUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const CsirtPostUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.CsirtPostUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => CsirtPostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CsirtPostUpdateWithoutAuthorInputSchema),z.lazy(() => CsirtPostUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const CsirtPostUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.CsirtPostUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => CsirtPostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CsirtPostUpdateManyMutationInputSchema),z.lazy(() => CsirtPostUncheckedUpdateManyWithoutCsirtPostInputSchema) ]),
}).strict();

export const CsirtPostScalarWhereInputSchema: z.ZodType<Prisma.CsirtPostScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CsirtPostScalarWhereInputSchema),z.lazy(() => CsirtPostScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CsirtPostScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CsirtPostScalarWhereInputSchema),z.lazy(() => CsirtPostScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  thumbnail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserCreateWithoutRoleInputSchema: z.ZodType<Prisma.UserCreateWithoutRoleInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutUserInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiCreateNestedManyWithoutAsesiInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiCreateNestedManyWithoutAsesorInputSchema).optional(),
  Devices: z.lazy(() => DevicesCreateNestedOneWithoutUserInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostCreateNestedManyWithoutAuthorInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRoleInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  unitId: z.string().optional().nullable(),
  devicesId: z.string().optional().nullable(),
  Asesi: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutAsesiInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutAsesorInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRoleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const UserCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyRoleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCreateManyRoleInputSchema),z.lazy(() => UserCreateManyRoleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutRoleInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoleInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRoleInputSchema),z.lazy(() => UserUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutRoleInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRoleInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutRoleInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  position: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  roleId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  unitId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  devicesId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserCreateWithoutUnitInputSchema: z.ZodType<Prisma.UserCreateWithoutUnitInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUserInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiCreateNestedManyWithoutAsesiInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiCreateNestedManyWithoutAsesorInputSchema).optional(),
  Devices: z.lazy(() => DevicesCreateNestedOneWithoutUserInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostCreateNestedManyWithoutAuthorInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutUnitInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUnitInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  roleId: z.string().optional().nullable(),
  devicesId: z.string().optional().nullable(),
  Asesi: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutAsesiInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutAsesorInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutUnitInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUnitInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUnitInputSchema),z.lazy(() => UserUncheckedCreateWithoutUnitInputSchema) ]),
}).strict();

export const UserCreateManyUnitInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyUnitInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCreateManyUnitInputSchema),z.lazy(() => UserCreateManyUnitInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SiteCreateWithoutUnitInputSchema: z.ZodType<Prisma.SiteCreateWithoutUnitInput> = z.object({
  id: z.string().optional(),
  url: z.string().optional().nullable(),
  ip: z.string().optional().nullable(),
  localIp: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  scanAt: z.coerce.date().optional().nullable(),
  siteAudit: z.lazy(() => SiteAuditCreateNestedManyWithoutSiteInputSchema).optional(),
}).strict();

export const SiteUncheckedCreateWithoutUnitInputSchema: z.ZodType<Prisma.SiteUncheckedCreateWithoutUnitInput> = z.object({
  id: z.string().optional(),
  url: z.string().optional().nullable(),
  ip: z.string().optional().nullable(),
  localIp: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  scanAt: z.coerce.date().optional().nullable(),
  siteAudit: z.lazy(() => SiteAuditUncheckedCreateNestedManyWithoutSiteInputSchema).optional(),
}).strict();

export const SiteCreateOrConnectWithoutUnitInputSchema: z.ZodType<Prisma.SiteCreateOrConnectWithoutUnitInput> = z.object({
  where: z.lazy(() => SiteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SiteCreateWithoutUnitInputSchema),z.lazy(() => SiteUncheckedCreateWithoutUnitInputSchema) ]),
}).strict();

export const SiteCreateManyUnitInputEnvelopeSchema: z.ZodType<Prisma.SiteCreateManyUnitInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SiteCreateManyUnitInputSchema),z.lazy(() => SiteCreateManyUnitInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CertificateCreateWithoutUnitInputSchema: z.ZodType<Prisma.CertificateCreateWithoutUnitInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  nip: z.string().optional().nullable(),
  nik: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  jabatan: z.string().optional().nullable(),
  organisasiUnit: z.string().optional().nullable(),
  status: z.string(),
  certificateStatus: z.string(),
  notBeforeDate: z.coerce.date().optional().nullable(),
  notAfterDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const CertificateUncheckedCreateWithoutUnitInputSchema: z.ZodType<Prisma.CertificateUncheckedCreateWithoutUnitInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  nip: z.string().optional().nullable(),
  nik: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  jabatan: z.string().optional().nullable(),
  organisasiUnit: z.string().optional().nullable(),
  status: z.string(),
  certificateStatus: z.string(),
  notBeforeDate: z.coerce.date().optional().nullable(),
  notAfterDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const CertificateCreateOrConnectWithoutUnitInputSchema: z.ZodType<Prisma.CertificateCreateOrConnectWithoutUnitInput> = z.object({
  where: z.lazy(() => CertificateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CertificateCreateWithoutUnitInputSchema),z.lazy(() => CertificateUncheckedCreateWithoutUnitInputSchema) ]),
}).strict();

export const CertificateCreateManyUnitInputEnvelopeSchema: z.ZodType<Prisma.CertificateCreateManyUnitInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CertificateCreateManyUnitInputSchema),z.lazy(() => CertificateCreateManyUnitInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const IndeksKamiCreateWithoutUnitInputSchema: z.ZodType<Prisma.IndeksKamiCreateWithoutUnitInput> = z.object({
  id: z.string().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  category: z.lazy(() => IndeksKamiCategoryCreateNestedOneWithoutIndeksKamiInputSchema).optional(),
  asesi: z.lazy(() => UserCreateNestedOneWithoutAsesiInputSchema).optional(),
  asesor: z.lazy(() => UserCreateNestedOneWithoutAsesorInputSchema).optional(),
  result: z.lazy(() => IndeksKamiDataCreateNestedManyWithoutIndeksKamiInputSchema).optional(),
}).strict();

export const IndeksKamiUncheckedCreateWithoutUnitInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedCreateWithoutUnitInput> = z.object({
  id: z.string().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  asesiId: z.string(),
  asesorId: z.string().optional().nullable(),
  result: z.lazy(() => IndeksKamiDataUncheckedCreateNestedManyWithoutIndeksKamiInputSchema).optional(),
}).strict();

export const IndeksKamiCreateOrConnectWithoutUnitInputSchema: z.ZodType<Prisma.IndeksKamiCreateOrConnectWithoutUnitInput> = z.object({
  where: z.lazy(() => IndeksKamiWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutUnitInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutUnitInputSchema) ]),
}).strict();

export const IndeksKamiCreateManyUnitInputEnvelopeSchema: z.ZodType<Prisma.IndeksKamiCreateManyUnitInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => IndeksKamiCreateManyUnitInputSchema),z.lazy(() => IndeksKamiCreateManyUnitInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const HelpdeskCreateWithoutUnitInputSchema: z.ZodType<Prisma.HelpdeskCreateWithoutUnitInput> = z.object({
  id: z.string().optional(),
  subject: z.string(),
  content: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
  slug: z.string().optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  category: z.lazy(() => HelpdeskCategoryCreateNestedOneWithoutHelpdeskInputSchema).optional(),
}).strict();

export const HelpdeskUncheckedCreateWithoutUnitInputSchema: z.ZodType<Prisma.HelpdeskUncheckedCreateWithoutUnitInput> = z.object({
  id: z.string().optional(),
  subject: z.string(),
  content: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
  slug: z.string().optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
}).strict();

export const HelpdeskCreateOrConnectWithoutUnitInputSchema: z.ZodType<Prisma.HelpdeskCreateOrConnectWithoutUnitInput> = z.object({
  where: z.lazy(() => HelpdeskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HelpdeskCreateWithoutUnitInputSchema),z.lazy(() => HelpdeskUncheckedCreateWithoutUnitInputSchema) ]),
}).strict();

export const HelpdeskCreateManyUnitInputEnvelopeSchema: z.ZodType<Prisma.HelpdeskCreateManyUnitInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => HelpdeskCreateManyUnitInputSchema),z.lazy(() => HelpdeskCreateManyUnitInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserUpsertWithWhereUniqueWithoutUnitInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutUnitInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutUnitInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUnitInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUnitInputSchema),z.lazy(() => UserUncheckedCreateWithoutUnitInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutUnitInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutUnitInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutUnitInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUnitInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutUnitInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutUnitInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SiteUpsertWithWhereUniqueWithoutUnitInputSchema: z.ZodType<Prisma.SiteUpsertWithWhereUniqueWithoutUnitInput> = z.object({
  where: z.lazy(() => SiteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SiteUpdateWithoutUnitInputSchema),z.lazy(() => SiteUncheckedUpdateWithoutUnitInputSchema) ]),
  create: z.union([ z.lazy(() => SiteCreateWithoutUnitInputSchema),z.lazy(() => SiteUncheckedCreateWithoutUnitInputSchema) ]),
}).strict();

export const SiteUpdateWithWhereUniqueWithoutUnitInputSchema: z.ZodType<Prisma.SiteUpdateWithWhereUniqueWithoutUnitInput> = z.object({
  where: z.lazy(() => SiteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SiteUpdateWithoutUnitInputSchema),z.lazy(() => SiteUncheckedUpdateWithoutUnitInputSchema) ]),
}).strict();

export const SiteUpdateManyWithWhereWithoutUnitInputSchema: z.ZodType<Prisma.SiteUpdateManyWithWhereWithoutUnitInput> = z.object({
  where: z.lazy(() => SiteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SiteUpdateManyMutationInputSchema),z.lazy(() => SiteUncheckedUpdateManyWithoutSiteInputSchema) ]),
}).strict();

export const SiteScalarWhereInputSchema: z.ZodType<Prisma.SiteScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SiteScalarWhereInputSchema),z.lazy(() => SiteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SiteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SiteScalarWhereInputSchema),z.lazy(() => SiteScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ip: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  localIp: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  scanAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  unitId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CertificateUpsertWithWhereUniqueWithoutUnitInputSchema: z.ZodType<Prisma.CertificateUpsertWithWhereUniqueWithoutUnitInput> = z.object({
  where: z.lazy(() => CertificateWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CertificateUpdateWithoutUnitInputSchema),z.lazy(() => CertificateUncheckedUpdateWithoutUnitInputSchema) ]),
  create: z.union([ z.lazy(() => CertificateCreateWithoutUnitInputSchema),z.lazy(() => CertificateUncheckedCreateWithoutUnitInputSchema) ]),
}).strict();

export const CertificateUpdateWithWhereUniqueWithoutUnitInputSchema: z.ZodType<Prisma.CertificateUpdateWithWhereUniqueWithoutUnitInput> = z.object({
  where: z.lazy(() => CertificateWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CertificateUpdateWithoutUnitInputSchema),z.lazy(() => CertificateUncheckedUpdateWithoutUnitInputSchema) ]),
}).strict();

export const CertificateUpdateManyWithWhereWithoutUnitInputSchema: z.ZodType<Prisma.CertificateUpdateManyWithWhereWithoutUnitInput> = z.object({
  where: z.lazy(() => CertificateScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CertificateUpdateManyMutationInputSchema),z.lazy(() => CertificateUncheckedUpdateManyWithoutCertificateInputSchema) ]),
}).strict();

export const CertificateScalarWhereInputSchema: z.ZodType<Prisma.CertificateScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CertificateScalarWhereInputSchema),z.lazy(() => CertificateScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CertificateScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CertificateScalarWhereInputSchema),z.lazy(() => CertificateScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nip: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nik: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  jabatan: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  organisasiUnit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  certificateStatus: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  notBeforeDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  notAfterDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  unitId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const IndeksKamiUpsertWithWhereUniqueWithoutUnitInputSchema: z.ZodType<Prisma.IndeksKamiUpsertWithWhereUniqueWithoutUnitInput> = z.object({
  where: z.lazy(() => IndeksKamiWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => IndeksKamiUpdateWithoutUnitInputSchema),z.lazy(() => IndeksKamiUncheckedUpdateWithoutUnitInputSchema) ]),
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutUnitInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutUnitInputSchema) ]),
}).strict();

export const IndeksKamiUpdateWithWhereUniqueWithoutUnitInputSchema: z.ZodType<Prisma.IndeksKamiUpdateWithWhereUniqueWithoutUnitInput> = z.object({
  where: z.lazy(() => IndeksKamiWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => IndeksKamiUpdateWithoutUnitInputSchema),z.lazy(() => IndeksKamiUncheckedUpdateWithoutUnitInputSchema) ]),
}).strict();

export const IndeksKamiUpdateManyWithWhereWithoutUnitInputSchema: z.ZodType<Prisma.IndeksKamiUpdateManyWithWhereWithoutUnitInput> = z.object({
  where: z.lazy(() => IndeksKamiScalarWhereInputSchema),
  data: z.union([ z.lazy(() => IndeksKamiUpdateManyMutationInputSchema),z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutAsesiInputSchema) ]),
}).strict();

export const HelpdeskUpsertWithWhereUniqueWithoutUnitInputSchema: z.ZodType<Prisma.HelpdeskUpsertWithWhereUniqueWithoutUnitInput> = z.object({
  where: z.lazy(() => HelpdeskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => HelpdeskUpdateWithoutUnitInputSchema),z.lazy(() => HelpdeskUncheckedUpdateWithoutUnitInputSchema) ]),
  create: z.union([ z.lazy(() => HelpdeskCreateWithoutUnitInputSchema),z.lazy(() => HelpdeskUncheckedCreateWithoutUnitInputSchema) ]),
}).strict();

export const HelpdeskUpdateWithWhereUniqueWithoutUnitInputSchema: z.ZodType<Prisma.HelpdeskUpdateWithWhereUniqueWithoutUnitInput> = z.object({
  where: z.lazy(() => HelpdeskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => HelpdeskUpdateWithoutUnitInputSchema),z.lazy(() => HelpdeskUncheckedUpdateWithoutUnitInputSchema) ]),
}).strict();

export const HelpdeskUpdateManyWithWhereWithoutUnitInputSchema: z.ZodType<Prisma.HelpdeskUpdateManyWithWhereWithoutUnitInput> = z.object({
  where: z.lazy(() => HelpdeskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HelpdeskUpdateManyMutationInputSchema),z.lazy(() => HelpdeskUncheckedUpdateManyWithoutHelpdeskInputSchema) ]),
}).strict();

export const HelpdeskScalarWhereInputSchema: z.ZodType<Prisma.HelpdeskScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HelpdeskScalarWhereInputSchema),z.lazy(() => HelpdeskScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HelpdeskScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HelpdeskScalarWhereInputSchema),z.lazy(() => HelpdeskScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  slug: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  unitId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutDevicesInputSchema: z.ZodType<Prisma.UserCreateWithoutDevicesInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUserInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutUserInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiCreateNestedManyWithoutAsesiInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiCreateNestedManyWithoutAsesorInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostCreateNestedManyWithoutAuthorInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutDevicesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDevicesInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  roleId: z.string().optional().nullable(),
  unitId: z.string().optional().nullable(),
  Asesi: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutAsesiInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutAsesorInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutDevicesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDevicesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema) ]),
}).strict();

export const UserCreateManyDevicesInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyDevicesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCreateManyDevicesInputSchema),z.lazy(() => UserCreateManyDevicesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserUpsertWithWhereUniqueWithoutDevicesInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutDevicesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDevicesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedCreateWithoutDevicesInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutDevicesInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutDevicesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutDevicesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDevicesInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutDevicesInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutDevicesInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SiteAuditCreateWithoutSiteInputSchema: z.ZodType<Prisma.SiteAuditCreateWithoutSiteInput> = z.object({
  id: z.string().optional(),
  screenshot: z.string().optional().nullable(),
  loadedTime: z.number().optional(),
  loadedSize: z.number().optional(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const SiteAuditUncheckedCreateWithoutSiteInputSchema: z.ZodType<Prisma.SiteAuditUncheckedCreateWithoutSiteInput> = z.object({
  id: z.string().optional(),
  screenshot: z.string().optional().nullable(),
  loadedTime: z.number().optional(),
  loadedSize: z.number().optional(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const SiteAuditCreateOrConnectWithoutSiteInputSchema: z.ZodType<Prisma.SiteAuditCreateOrConnectWithoutSiteInput> = z.object({
  where: z.lazy(() => SiteAuditWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SiteAuditCreateWithoutSiteInputSchema),z.lazy(() => SiteAuditUncheckedCreateWithoutSiteInputSchema) ]),
}).strict();

export const SiteAuditCreateManySiteInputEnvelopeSchema: z.ZodType<Prisma.SiteAuditCreateManySiteInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SiteAuditCreateManySiteInputSchema),z.lazy(() => SiteAuditCreateManySiteInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UnitCreateWithoutSiteInputSchema: z.ZodType<Prisma.UnitCreateWithoutSiteInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  User: z.lazy(() => UserCreateNestedManyWithoutUnitInputSchema).optional(),
  Certificate: z.lazy(() => CertificateCreateNestedManyWithoutUnitInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiCreateNestedManyWithoutUnitInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskCreateNestedManyWithoutUnitInputSchema).optional(),
}).strict();

export const UnitUncheckedCreateWithoutSiteInputSchema: z.ZodType<Prisma.UnitUncheckedCreateWithoutSiteInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Certificate: z.lazy(() => CertificateUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
}).strict();

export const UnitCreateOrConnectWithoutSiteInputSchema: z.ZodType<Prisma.UnitCreateOrConnectWithoutSiteInput> = z.object({
  where: z.lazy(() => UnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UnitCreateWithoutSiteInputSchema),z.lazy(() => UnitUncheckedCreateWithoutSiteInputSchema) ]),
}).strict();

export const SiteAuditUpsertWithWhereUniqueWithoutSiteInputSchema: z.ZodType<Prisma.SiteAuditUpsertWithWhereUniqueWithoutSiteInput> = z.object({
  where: z.lazy(() => SiteAuditWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SiteAuditUpdateWithoutSiteInputSchema),z.lazy(() => SiteAuditUncheckedUpdateWithoutSiteInputSchema) ]),
  create: z.union([ z.lazy(() => SiteAuditCreateWithoutSiteInputSchema),z.lazy(() => SiteAuditUncheckedCreateWithoutSiteInputSchema) ]),
}).strict();

export const SiteAuditUpdateWithWhereUniqueWithoutSiteInputSchema: z.ZodType<Prisma.SiteAuditUpdateWithWhereUniqueWithoutSiteInput> = z.object({
  where: z.lazy(() => SiteAuditWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SiteAuditUpdateWithoutSiteInputSchema),z.lazy(() => SiteAuditUncheckedUpdateWithoutSiteInputSchema) ]),
}).strict();

export const SiteAuditUpdateManyWithWhereWithoutSiteInputSchema: z.ZodType<Prisma.SiteAuditUpdateManyWithWhereWithoutSiteInput> = z.object({
  where: z.lazy(() => SiteAuditScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SiteAuditUpdateManyMutationInputSchema),z.lazy(() => SiteAuditUncheckedUpdateManyWithoutSiteAuditInputSchema) ]),
}).strict();

export const SiteAuditScalarWhereInputSchema: z.ZodType<Prisma.SiteAuditScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SiteAuditScalarWhereInputSchema),z.lazy(() => SiteAuditScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SiteAuditScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SiteAuditScalarWhereInputSchema),z.lazy(() => SiteAuditScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  screenshot: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  loadedTime: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  loadedSize: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  siteId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UnitUpsertWithoutSiteInputSchema: z.ZodType<Prisma.UnitUpsertWithoutSiteInput> = z.object({
  update: z.union([ z.lazy(() => UnitUpdateWithoutSiteInputSchema),z.lazy(() => UnitUncheckedUpdateWithoutSiteInputSchema) ]),
  create: z.union([ z.lazy(() => UnitCreateWithoutSiteInputSchema),z.lazy(() => UnitUncheckedCreateWithoutSiteInputSchema) ]),
}).strict();

export const UnitUpdateWithoutSiteInputSchema: z.ZodType<Prisma.UnitUpdateWithoutSiteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUpdateManyWithoutUnitNestedInputSchema).optional(),
  Certificate: z.lazy(() => CertificateUpdateManyWithoutUnitNestedInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUpdateManyWithoutUnitNestedInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskUpdateManyWithoutUnitNestedInputSchema).optional(),
}).strict();

export const UnitUncheckedUpdateWithoutSiteInputSchema: z.ZodType<Prisma.UnitUncheckedUpdateWithoutSiteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Certificate: z.lazy(() => CertificateUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
}).strict();

export const SiteCreateWithoutSiteAuditInputSchema: z.ZodType<Prisma.SiteCreateWithoutSiteAuditInput> = z.object({
  id: z.string().optional(),
  url: z.string().optional().nullable(),
  ip: z.string().optional().nullable(),
  localIp: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  scanAt: z.coerce.date().optional().nullable(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutSiteInputSchema).optional(),
}).strict();

export const SiteUncheckedCreateWithoutSiteAuditInputSchema: z.ZodType<Prisma.SiteUncheckedCreateWithoutSiteAuditInput> = z.object({
  id: z.string().optional(),
  url: z.string().optional().nullable(),
  ip: z.string().optional().nullable(),
  localIp: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  scanAt: z.coerce.date().optional().nullable(),
  unitId: z.string().optional().nullable(),
}).strict();

export const SiteCreateOrConnectWithoutSiteAuditInputSchema: z.ZodType<Prisma.SiteCreateOrConnectWithoutSiteAuditInput> = z.object({
  where: z.lazy(() => SiteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SiteCreateWithoutSiteAuditInputSchema),z.lazy(() => SiteUncheckedCreateWithoutSiteAuditInputSchema) ]),
}).strict();

export const SiteUpsertWithoutSiteAuditInputSchema: z.ZodType<Prisma.SiteUpsertWithoutSiteAuditInput> = z.object({
  update: z.union([ z.lazy(() => SiteUpdateWithoutSiteAuditInputSchema),z.lazy(() => SiteUncheckedUpdateWithoutSiteAuditInputSchema) ]),
  create: z.union([ z.lazy(() => SiteCreateWithoutSiteAuditInputSchema),z.lazy(() => SiteUncheckedCreateWithoutSiteAuditInputSchema) ]),
}).strict();

export const SiteUpdateWithoutSiteAuditInputSchema: z.ZodType<Prisma.SiteUpdateWithoutSiteAuditInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localIp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scanAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.lazy(() => UnitUpdateOneWithoutSiteNestedInputSchema).optional(),
}).strict();

export const SiteUncheckedUpdateWithoutSiteAuditInputSchema: z.ZodType<Prisma.SiteUncheckedUpdateWithoutSiteAuditInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localIp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scanAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UnitCreateWithoutCertificateInputSchema: z.ZodType<Prisma.UnitCreateWithoutCertificateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  User: z.lazy(() => UserCreateNestedManyWithoutUnitInputSchema).optional(),
  Site: z.lazy(() => SiteCreateNestedManyWithoutUnitInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiCreateNestedManyWithoutUnitInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskCreateNestedManyWithoutUnitInputSchema).optional(),
}).strict();

export const UnitUncheckedCreateWithoutCertificateInputSchema: z.ZodType<Prisma.UnitUncheckedCreateWithoutCertificateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Site: z.lazy(() => SiteUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
}).strict();

export const UnitCreateOrConnectWithoutCertificateInputSchema: z.ZodType<Prisma.UnitCreateOrConnectWithoutCertificateInput> = z.object({
  where: z.lazy(() => UnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UnitCreateWithoutCertificateInputSchema),z.lazy(() => UnitUncheckedCreateWithoutCertificateInputSchema) ]),
}).strict();

export const UnitUpsertWithoutCertificateInputSchema: z.ZodType<Prisma.UnitUpsertWithoutCertificateInput> = z.object({
  update: z.union([ z.lazy(() => UnitUpdateWithoutCertificateInputSchema),z.lazy(() => UnitUncheckedUpdateWithoutCertificateInputSchema) ]),
  create: z.union([ z.lazy(() => UnitCreateWithoutCertificateInputSchema),z.lazy(() => UnitUncheckedCreateWithoutCertificateInputSchema) ]),
}).strict();

export const UnitUpdateWithoutCertificateInputSchema: z.ZodType<Prisma.UnitUpdateWithoutCertificateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUpdateManyWithoutUnitNestedInputSchema).optional(),
  Site: z.lazy(() => SiteUpdateManyWithoutUnitNestedInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUpdateManyWithoutUnitNestedInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskUpdateManyWithoutUnitNestedInputSchema).optional(),
}).strict();

export const UnitUncheckedUpdateWithoutCertificateInputSchema: z.ZodType<Prisma.UnitUncheckedUpdateWithoutCertificateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Site: z.lazy(() => SiteUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
}).strict();

export const CsirtCategoryCreateWithoutCsirtInputSchema: z.ZodType<Prisma.CsirtCategoryCreateWithoutCsirtInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const CsirtCategoryUncheckedCreateWithoutCsirtInputSchema: z.ZodType<Prisma.CsirtCategoryUncheckedCreateWithoutCsirtInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const CsirtCategoryCreateOrConnectWithoutCsirtInputSchema: z.ZodType<Prisma.CsirtCategoryCreateOrConnectWithoutCsirtInput> = z.object({
  where: z.lazy(() => CsirtCategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CsirtCategoryCreateWithoutCsirtInputSchema),z.lazy(() => CsirtCategoryUncheckedCreateWithoutCsirtInputSchema) ]),
}).strict();

export const UserCreateWithoutCsirtPostInputSchema: z.ZodType<Prisma.UserCreateWithoutCsirtPostInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUserInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutUserInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiCreateNestedManyWithoutAsesiInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiCreateNestedManyWithoutAsesorInputSchema).optional(),
  Devices: z.lazy(() => DevicesCreateNestedOneWithoutUserInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutCsirtPostInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCsirtPostInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  roleId: z.string().optional().nullable(),
  unitId: z.string().optional().nullable(),
  devicesId: z.string().optional().nullable(),
  Asesi: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutAsesiInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutAsesorInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutCsirtPostInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCsirtPostInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCsirtPostInputSchema),z.lazy(() => UserUncheckedCreateWithoutCsirtPostInputSchema) ]),
}).strict();

export const CsirtCategoryUpsertWithoutCsirtInputSchema: z.ZodType<Prisma.CsirtCategoryUpsertWithoutCsirtInput> = z.object({
  update: z.union([ z.lazy(() => CsirtCategoryUpdateWithoutCsirtInputSchema),z.lazy(() => CsirtCategoryUncheckedUpdateWithoutCsirtInputSchema) ]),
  create: z.union([ z.lazy(() => CsirtCategoryCreateWithoutCsirtInputSchema),z.lazy(() => CsirtCategoryUncheckedCreateWithoutCsirtInputSchema) ]),
}).strict();

export const CsirtCategoryUpdateWithoutCsirtInputSchema: z.ZodType<Prisma.CsirtCategoryUpdateWithoutCsirtInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CsirtCategoryUncheckedUpdateWithoutCsirtInputSchema: z.ZodType<Prisma.CsirtCategoryUncheckedUpdateWithoutCsirtInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutCsirtPostInputSchema: z.ZodType<Prisma.UserUpsertWithoutCsirtPostInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCsirtPostInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCsirtPostInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCsirtPostInputSchema),z.lazy(() => UserUncheckedCreateWithoutCsirtPostInputSchema) ]),
}).strict();

export const UserUpdateWithoutCsirtPostInputSchema: z.ZodType<Prisma.UserUpdateWithoutCsirtPostInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.lazy(() => RoleUpdateOneWithoutUserNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutUserNestedInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUpdateManyWithoutAsesiNestedInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiUpdateManyWithoutAsesorNestedInputSchema).optional(),
  Devices: z.lazy(() => DevicesUpdateOneWithoutUserNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutCsirtPostInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCsirtPostInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  devicesId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Asesi: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutAsesiNestedInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutAsesorNestedInputSchema).optional(),
}).strict();

export const CsirtPostCreateWithoutCategoryInputSchema: z.ZodType<Prisma.CsirtPostCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  thumbnail: z.string().optional().nullable(),
  type: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutCsirtPostInputSchema).optional(),
}).strict();

export const CsirtPostUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.CsirtPostUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  thumbnail: z.string().optional().nullable(),
  type: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
}).strict();

export const CsirtPostCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.CsirtPostCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => CsirtPostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CsirtPostCreateWithoutCategoryInputSchema),z.lazy(() => CsirtPostUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const CsirtPostCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.CsirtPostCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CsirtPostCreateManyCategoryInputSchema),z.lazy(() => CsirtPostCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const CsirtPostUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.CsirtPostUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => CsirtPostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CsirtPostUpdateWithoutCategoryInputSchema),z.lazy(() => CsirtPostUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => CsirtPostCreateWithoutCategoryInputSchema),z.lazy(() => CsirtPostUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const CsirtPostUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.CsirtPostUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => CsirtPostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CsirtPostUpdateWithoutCategoryInputSchema),z.lazy(() => CsirtPostUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const CsirtPostUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.CsirtPostUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => CsirtPostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CsirtPostUpdateManyMutationInputSchema),z.lazy(() => CsirtPostUncheckedUpdateManyWithoutCsirtInputSchema) ]),
}).strict();

export const HelpdeskCategoryCreateWithoutHelpdeskInputSchema: z.ZodType<Prisma.HelpdeskCategoryCreateWithoutHelpdeskInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const HelpdeskCategoryUncheckedCreateWithoutHelpdeskInputSchema: z.ZodType<Prisma.HelpdeskCategoryUncheckedCreateWithoutHelpdeskInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const HelpdeskCategoryCreateOrConnectWithoutHelpdeskInputSchema: z.ZodType<Prisma.HelpdeskCategoryCreateOrConnectWithoutHelpdeskInput> = z.object({
  where: z.lazy(() => HelpdeskCategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HelpdeskCategoryCreateWithoutHelpdeskInputSchema),z.lazy(() => HelpdeskCategoryUncheckedCreateWithoutHelpdeskInputSchema) ]),
}).strict();

export const UnitCreateWithoutHelpdeskInputSchema: z.ZodType<Prisma.UnitCreateWithoutHelpdeskInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  User: z.lazy(() => UserCreateNestedManyWithoutUnitInputSchema).optional(),
  Site: z.lazy(() => SiteCreateNestedManyWithoutUnitInputSchema).optional(),
  Certificate: z.lazy(() => CertificateCreateNestedManyWithoutUnitInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiCreateNestedManyWithoutUnitInputSchema).optional(),
}).strict();

export const UnitUncheckedCreateWithoutHelpdeskInputSchema: z.ZodType<Prisma.UnitUncheckedCreateWithoutHelpdeskInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Site: z.lazy(() => SiteUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Certificate: z.lazy(() => CertificateUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
}).strict();

export const UnitCreateOrConnectWithoutHelpdeskInputSchema: z.ZodType<Prisma.UnitCreateOrConnectWithoutHelpdeskInput> = z.object({
  where: z.lazy(() => UnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UnitCreateWithoutHelpdeskInputSchema),z.lazy(() => UnitUncheckedCreateWithoutHelpdeskInputSchema) ]),
}).strict();

export const HelpdeskCategoryUpsertWithoutHelpdeskInputSchema: z.ZodType<Prisma.HelpdeskCategoryUpsertWithoutHelpdeskInput> = z.object({
  update: z.union([ z.lazy(() => HelpdeskCategoryUpdateWithoutHelpdeskInputSchema),z.lazy(() => HelpdeskCategoryUncheckedUpdateWithoutHelpdeskInputSchema) ]),
  create: z.union([ z.lazy(() => HelpdeskCategoryCreateWithoutHelpdeskInputSchema),z.lazy(() => HelpdeskCategoryUncheckedCreateWithoutHelpdeskInputSchema) ]),
}).strict();

export const HelpdeskCategoryUpdateWithoutHelpdeskInputSchema: z.ZodType<Prisma.HelpdeskCategoryUpdateWithoutHelpdeskInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HelpdeskCategoryUncheckedUpdateWithoutHelpdeskInputSchema: z.ZodType<Prisma.HelpdeskCategoryUncheckedUpdateWithoutHelpdeskInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UnitUpsertWithoutHelpdeskInputSchema: z.ZodType<Prisma.UnitUpsertWithoutHelpdeskInput> = z.object({
  update: z.union([ z.lazy(() => UnitUpdateWithoutHelpdeskInputSchema),z.lazy(() => UnitUncheckedUpdateWithoutHelpdeskInputSchema) ]),
  create: z.union([ z.lazy(() => UnitCreateWithoutHelpdeskInputSchema),z.lazy(() => UnitUncheckedCreateWithoutHelpdeskInputSchema) ]),
}).strict();

export const UnitUpdateWithoutHelpdeskInputSchema: z.ZodType<Prisma.UnitUpdateWithoutHelpdeskInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUpdateManyWithoutUnitNestedInputSchema).optional(),
  Site: z.lazy(() => SiteUpdateManyWithoutUnitNestedInputSchema).optional(),
  Certificate: z.lazy(() => CertificateUpdateManyWithoutUnitNestedInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUpdateManyWithoutUnitNestedInputSchema).optional(),
}).strict();

export const UnitUncheckedUpdateWithoutHelpdeskInputSchema: z.ZodType<Prisma.UnitUncheckedUpdateWithoutHelpdeskInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Site: z.lazy(() => SiteUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Certificate: z.lazy(() => CertificateUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
}).strict();

export const HelpdeskCreateWithoutCategoryInputSchema: z.ZodType<Prisma.HelpdeskCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  subject: z.string(),
  content: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
  slug: z.string().optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutHelpdeskInputSchema),
}).strict();

export const HelpdeskUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.HelpdeskUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  subject: z.string(),
  content: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
  slug: z.string().optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  unitId: z.string(),
}).strict();

export const HelpdeskCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.HelpdeskCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => HelpdeskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HelpdeskCreateWithoutCategoryInputSchema),z.lazy(() => HelpdeskUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const HelpdeskCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.HelpdeskCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => HelpdeskCreateManyCategoryInputSchema),z.lazy(() => HelpdeskCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const HelpdeskUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.HelpdeskUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => HelpdeskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => HelpdeskUpdateWithoutCategoryInputSchema),z.lazy(() => HelpdeskUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => HelpdeskCreateWithoutCategoryInputSchema),z.lazy(() => HelpdeskUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const HelpdeskUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.HelpdeskUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => HelpdeskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => HelpdeskUpdateWithoutCategoryInputSchema),z.lazy(() => HelpdeskUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const HelpdeskUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.HelpdeskUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => HelpdeskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HelpdeskUpdateManyMutationInputSchema),z.lazy(() => HelpdeskUncheckedUpdateManyWithoutHelpdeskInputSchema) ]),
}).strict();

export const IndeksKamiCategoryCreateWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiCategoryCreateWithoutIndeksKamiInput> = z.object({
  id: z.string().optional(),
  version: z.string().optional(),
  code: z.number(),
  type: z.string(),
  part: z.string(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const IndeksKamiCategoryUncheckedCreateWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiCategoryUncheckedCreateWithoutIndeksKamiInput> = z.object({
  id: z.string().optional(),
  version: z.string().optional(),
  code: z.number(),
  type: z.string(),
  part: z.string(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const IndeksKamiCategoryCreateOrConnectWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiCategoryCreateOrConnectWithoutIndeksKamiInput> = z.object({
  where: z.lazy(() => IndeksKamiCategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IndeksKamiCategoryCreateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiCategoryUncheckedCreateWithoutIndeksKamiInputSchema) ]),
}).strict();

export const UnitCreateWithoutAsesiInputSchema: z.ZodType<Prisma.UnitCreateWithoutAsesiInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  User: z.lazy(() => UserCreateNestedManyWithoutUnitInputSchema).optional(),
  Site: z.lazy(() => SiteCreateNestedManyWithoutUnitInputSchema).optional(),
  Certificate: z.lazy(() => CertificateCreateNestedManyWithoutUnitInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskCreateNestedManyWithoutUnitInputSchema).optional(),
}).strict();

export const UnitUncheckedCreateWithoutAsesiInputSchema: z.ZodType<Prisma.UnitUncheckedCreateWithoutAsesiInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Site: z.lazy(() => SiteUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Certificate: z.lazy(() => CertificateUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskUncheckedCreateNestedManyWithoutUnitInputSchema).optional(),
}).strict();

export const UnitCreateOrConnectWithoutAsesiInputSchema: z.ZodType<Prisma.UnitCreateOrConnectWithoutAsesiInput> = z.object({
  where: z.lazy(() => UnitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UnitCreateWithoutAsesiInputSchema),z.lazy(() => UnitUncheckedCreateWithoutAsesiInputSchema) ]),
}).strict();

export const UserCreateWithoutAsesiInputSchema: z.ZodType<Prisma.UserCreateWithoutAsesiInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUserInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutUserInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiCreateNestedManyWithoutAsesorInputSchema).optional(),
  Devices: z.lazy(() => DevicesCreateNestedOneWithoutUserInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostCreateNestedManyWithoutAuthorInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutAsesiInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAsesiInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  roleId: z.string().optional().nullable(),
  unitId: z.string().optional().nullable(),
  devicesId: z.string().optional().nullable(),
  Asesor: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutAsesorInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutAsesiInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAsesiInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAsesiInputSchema),z.lazy(() => UserUncheckedCreateWithoutAsesiInputSchema) ]),
}).strict();

export const UserCreateWithoutAsesorInputSchema: z.ZodType<Prisma.UserCreateWithoutAsesorInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUserInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutUserInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiCreateNestedManyWithoutAsesiInputSchema).optional(),
  Devices: z.lazy(() => DevicesCreateNestedOneWithoutUserInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostCreateNestedManyWithoutAuthorInputSchema).optional(),
}).strict();

export const UserUncheckedCreateWithoutAsesorInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAsesorInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  roleId: z.string().optional().nullable(),
  unitId: z.string().optional().nullable(),
  devicesId: z.string().optional().nullable(),
  Asesi: z.lazy(() => IndeksKamiUncheckedCreateNestedManyWithoutAsesiInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
}).strict();

export const UserCreateOrConnectWithoutAsesorInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAsesorInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAsesorInputSchema),z.lazy(() => UserUncheckedCreateWithoutAsesorInputSchema) ]),
}).strict();

export const IndeksKamiDataCreateWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiDataCreateWithoutIndeksKamiInput> = z.object({
  id: z.string().optional(),
  type: z.string().optional(),
  value: z.number().optional().nullable(),
  file: z.string().optional().nullable(),
  filename: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  category: z.number(),
  code: z.string(),
  part: z.string().optional().nullable(),
  step: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  template: z.lazy(() => IndeksKamiTemplateCreateNestedOneWithoutResultInputSchema).optional(),
}).strict();

export const IndeksKamiDataUncheckedCreateWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiDataUncheckedCreateWithoutIndeksKamiInput> = z.object({
  id: z.string().optional(),
  type: z.string().optional(),
  value: z.number().optional().nullable(),
  file: z.string().optional().nullable(),
  filename: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  category: z.number(),
  code: z.string(),
  part: z.string().optional().nullable(),
  step: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  templateId: z.string().optional().nullable(),
}).strict();

export const IndeksKamiDataCreateOrConnectWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiDataCreateOrConnectWithoutIndeksKamiInput> = z.object({
  where: z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IndeksKamiDataCreateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutIndeksKamiInputSchema) ]),
}).strict();

export const IndeksKamiDataCreateManyIndeksKamiInputEnvelopeSchema: z.ZodType<Prisma.IndeksKamiDataCreateManyIndeksKamiInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => IndeksKamiDataCreateManyIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataCreateManyIndeksKamiInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const IndeksKamiCategoryUpsertWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiCategoryUpsertWithoutIndeksKamiInput> = z.object({
  update: z.union([ z.lazy(() => IndeksKamiCategoryUpdateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiCategoryUncheckedUpdateWithoutIndeksKamiInputSchema) ]),
  create: z.union([ z.lazy(() => IndeksKamiCategoryCreateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiCategoryUncheckedCreateWithoutIndeksKamiInputSchema) ]),
}).strict();

export const IndeksKamiCategoryUpdateWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiCategoryUpdateWithoutIndeksKamiInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndeksKamiCategoryUncheckedUpdateWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiCategoryUncheckedUpdateWithoutIndeksKamiInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UnitUpsertWithoutAsesiInputSchema: z.ZodType<Prisma.UnitUpsertWithoutAsesiInput> = z.object({
  update: z.union([ z.lazy(() => UnitUpdateWithoutAsesiInputSchema),z.lazy(() => UnitUncheckedUpdateWithoutAsesiInputSchema) ]),
  create: z.union([ z.lazy(() => UnitCreateWithoutAsesiInputSchema),z.lazy(() => UnitUncheckedCreateWithoutAsesiInputSchema) ]),
}).strict();

export const UnitUpdateWithoutAsesiInputSchema: z.ZodType<Prisma.UnitUpdateWithoutAsesiInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUpdateManyWithoutUnitNestedInputSchema).optional(),
  Site: z.lazy(() => SiteUpdateManyWithoutUnitNestedInputSchema).optional(),
  Certificate: z.lazy(() => CertificateUpdateManyWithoutUnitNestedInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskUpdateManyWithoutUnitNestedInputSchema).optional(),
}).strict();

export const UnitUncheckedUpdateWithoutAsesiInputSchema: z.ZodType<Prisma.UnitUncheckedUpdateWithoutAsesiInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Site: z.lazy(() => SiteUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Certificate: z.lazy(() => CertificateUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
  Helpdesk: z.lazy(() => HelpdeskUncheckedUpdateManyWithoutUnitNestedInputSchema).optional(),
}).strict();

export const UserUpsertWithoutAsesiInputSchema: z.ZodType<Prisma.UserUpsertWithoutAsesiInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAsesiInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAsesiInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAsesiInputSchema),z.lazy(() => UserUncheckedCreateWithoutAsesiInputSchema) ]),
}).strict();

export const UserUpdateWithoutAsesiInputSchema: z.ZodType<Prisma.UserUpdateWithoutAsesiInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.lazy(() => RoleUpdateOneWithoutUserNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutUserNestedInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiUpdateManyWithoutAsesorNestedInputSchema).optional(),
  Devices: z.lazy(() => DevicesUpdateOneWithoutUserNestedInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUpdateManyWithoutAuthorNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutAsesiInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAsesiInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  devicesId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Asesor: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutAsesorNestedInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
}).strict();

export const UserUpsertWithoutAsesorInputSchema: z.ZodType<Prisma.UserUpsertWithoutAsesorInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAsesorInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAsesorInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAsesorInputSchema),z.lazy(() => UserUncheckedCreateWithoutAsesorInputSchema) ]),
}).strict();

export const UserUpdateWithoutAsesorInputSchema: z.ZodType<Prisma.UserUpdateWithoutAsesorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.lazy(() => RoleUpdateOneWithoutUserNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutUserNestedInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUpdateManyWithoutAsesiNestedInputSchema).optional(),
  Devices: z.lazy(() => DevicesUpdateOneWithoutUserNestedInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUpdateManyWithoutAuthorNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutAsesorInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAsesorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  devicesId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Asesi: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutAsesiNestedInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
}).strict();

export const IndeksKamiDataUpsertWithWhereUniqueWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiDataUpsertWithWhereUniqueWithoutIndeksKamiInput> = z.object({
  where: z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => IndeksKamiDataUpdateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataUncheckedUpdateWithoutIndeksKamiInputSchema) ]),
  create: z.union([ z.lazy(() => IndeksKamiDataCreateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutIndeksKamiInputSchema) ]),
}).strict();

export const IndeksKamiDataUpdateWithWhereUniqueWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiDataUpdateWithWhereUniqueWithoutIndeksKamiInput> = z.object({
  where: z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => IndeksKamiDataUpdateWithoutIndeksKamiInputSchema),z.lazy(() => IndeksKamiDataUncheckedUpdateWithoutIndeksKamiInputSchema) ]),
}).strict();

export const IndeksKamiDataUpdateManyWithWhereWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiDataUpdateManyWithWhereWithoutIndeksKamiInput> = z.object({
  where: z.lazy(() => IndeksKamiDataScalarWhereInputSchema),
  data: z.union([ z.lazy(() => IndeksKamiDataUpdateManyMutationInputSchema),z.lazy(() => IndeksKamiDataUncheckedUpdateManyWithoutResultInputSchema) ]),
}).strict();

export const IndeksKamiDataScalarWhereInputSchema: z.ZodType<Prisma.IndeksKamiDataScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => IndeksKamiDataScalarWhereInputSchema),z.lazy(() => IndeksKamiDataScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => IndeksKamiDataScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => IndeksKamiDataScalarWhereInputSchema),z.lazy(() => IndeksKamiDataScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  file: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  filename: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  category: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  part: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  step: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  indeksId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  templateId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const IndeksKamiCreateWithoutCategoryInputSchema: z.ZodType<Prisma.IndeksKamiCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutAsesiInputSchema).optional(),
  asesi: z.lazy(() => UserCreateNestedOneWithoutAsesiInputSchema).optional(),
  asesor: z.lazy(() => UserCreateNestedOneWithoutAsesorInputSchema).optional(),
  result: z.lazy(() => IndeksKamiDataCreateNestedManyWithoutIndeksKamiInputSchema).optional(),
}).strict();

export const IndeksKamiUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  unitId: z.string().optional().nullable(),
  asesiId: z.string(),
  asesorId: z.string().optional().nullable(),
  result: z.lazy(() => IndeksKamiDataUncheckedCreateNestedManyWithoutIndeksKamiInputSchema).optional(),
}).strict();

export const IndeksKamiCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.IndeksKamiCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => IndeksKamiWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutCategoryInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const IndeksKamiCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.IndeksKamiCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => IndeksKamiCreateManyCategoryInputSchema),z.lazy(() => IndeksKamiCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const IndeksKamiUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.IndeksKamiUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => IndeksKamiWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => IndeksKamiUpdateWithoutCategoryInputSchema),z.lazy(() => IndeksKamiUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutCategoryInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const IndeksKamiUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.IndeksKamiUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => IndeksKamiWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => IndeksKamiUpdateWithoutCategoryInputSchema),z.lazy(() => IndeksKamiUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const IndeksKamiUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.IndeksKamiUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => IndeksKamiScalarWhereInputSchema),
  data: z.union([ z.lazy(() => IndeksKamiUpdateManyMutationInputSchema),z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutIndeksKamiInputSchema) ]),
}).strict();

export const IndeksKamiDataCreateWithoutTemplateInputSchema: z.ZodType<Prisma.IndeksKamiDataCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  type: z.string().optional(),
  value: z.number().optional().nullable(),
  file: z.string().optional().nullable(),
  filename: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  category: z.number(),
  code: z.string(),
  part: z.string().optional().nullable(),
  step: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  IndeksKami: z.lazy(() => IndeksKamiCreateNestedOneWithoutResultInputSchema).optional(),
}).strict();

export const IndeksKamiDataUncheckedCreateWithoutTemplateInputSchema: z.ZodType<Prisma.IndeksKamiDataUncheckedCreateWithoutTemplateInput> = z.object({
  id: z.string().optional(),
  type: z.string().optional(),
  value: z.number().optional().nullable(),
  file: z.string().optional().nullable(),
  filename: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  category: z.number(),
  code: z.string(),
  part: z.string().optional().nullable(),
  step: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  indeksId: z.string().optional().nullable(),
}).strict();

export const IndeksKamiDataCreateOrConnectWithoutTemplateInputSchema: z.ZodType<Prisma.IndeksKamiDataCreateOrConnectWithoutTemplateInput> = z.object({
  where: z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IndeksKamiDataCreateWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const IndeksKamiDataCreateManyTemplateInputEnvelopeSchema: z.ZodType<Prisma.IndeksKamiDataCreateManyTemplateInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => IndeksKamiDataCreateManyTemplateInputSchema),z.lazy(() => IndeksKamiDataCreateManyTemplateInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const IndeksKamiDataUpsertWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.IndeksKamiDataUpsertWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => IndeksKamiDataUpdateWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataUncheckedUpdateWithoutTemplateInputSchema) ]),
  create: z.union([ z.lazy(() => IndeksKamiDataCreateWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataUncheckedCreateWithoutTemplateInputSchema) ]),
}).strict();

export const IndeksKamiDataUpdateWithWhereUniqueWithoutTemplateInputSchema: z.ZodType<Prisma.IndeksKamiDataUpdateWithWhereUniqueWithoutTemplateInput> = z.object({
  where: z.lazy(() => IndeksKamiDataWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => IndeksKamiDataUpdateWithoutTemplateInputSchema),z.lazy(() => IndeksKamiDataUncheckedUpdateWithoutTemplateInputSchema) ]),
}).strict();

export const IndeksKamiDataUpdateManyWithWhereWithoutTemplateInputSchema: z.ZodType<Prisma.IndeksKamiDataUpdateManyWithWhereWithoutTemplateInput> = z.object({
  where: z.lazy(() => IndeksKamiDataScalarWhereInputSchema),
  data: z.union([ z.lazy(() => IndeksKamiDataUpdateManyMutationInputSchema),z.lazy(() => IndeksKamiDataUncheckedUpdateManyWithoutResultInputSchema) ]),
}).strict();

export const IndeksKamiCreateWithoutResultInputSchema: z.ZodType<Prisma.IndeksKamiCreateWithoutResultInput> = z.object({
  id: z.string().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  category: z.lazy(() => IndeksKamiCategoryCreateNestedOneWithoutIndeksKamiInputSchema).optional(),
  unit: z.lazy(() => UnitCreateNestedOneWithoutAsesiInputSchema).optional(),
  asesi: z.lazy(() => UserCreateNestedOneWithoutAsesiInputSchema).optional(),
  asesor: z.lazy(() => UserCreateNestedOneWithoutAsesorInputSchema).optional(),
}).strict();

export const IndeksKamiUncheckedCreateWithoutResultInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedCreateWithoutResultInput> = z.object({
  id: z.string().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  unitId: z.string().optional().nullable(),
  asesiId: z.string(),
  asesorId: z.string().optional().nullable(),
}).strict();

export const IndeksKamiCreateOrConnectWithoutResultInputSchema: z.ZodType<Prisma.IndeksKamiCreateOrConnectWithoutResultInput> = z.object({
  where: z.lazy(() => IndeksKamiWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutResultInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutResultInputSchema) ]),
}).strict();

export const IndeksKamiTemplateCreateWithoutResultInputSchema: z.ZodType<Prisma.IndeksKamiTemplateCreateWithoutResultInput> = z.object({
  id: z.string().optional(),
  version: z.string().optional(),
  header: z.string().optional().nullable(),
  category: z.number(),
  code: z.string(),
  part: z.string().optional().nullable(),
  step: z.number().optional().nullable(),
  question: z.string(),
  example: z.string().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const IndeksKamiTemplateUncheckedCreateWithoutResultInputSchema: z.ZodType<Prisma.IndeksKamiTemplateUncheckedCreateWithoutResultInput> = z.object({
  id: z.string().optional(),
  version: z.string().optional(),
  header: z.string().optional().nullable(),
  category: z.number(),
  code: z.string(),
  part: z.string().optional().nullable(),
  step: z.number().optional().nullable(),
  question: z.string(),
  example: z.string().optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const IndeksKamiTemplateCreateOrConnectWithoutResultInputSchema: z.ZodType<Prisma.IndeksKamiTemplateCreateOrConnectWithoutResultInput> = z.object({
  where: z.lazy(() => IndeksKamiTemplateWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => IndeksKamiTemplateCreateWithoutResultInputSchema),z.lazy(() => IndeksKamiTemplateUncheckedCreateWithoutResultInputSchema) ]),
}).strict();

export const IndeksKamiUpsertWithoutResultInputSchema: z.ZodType<Prisma.IndeksKamiUpsertWithoutResultInput> = z.object({
  update: z.union([ z.lazy(() => IndeksKamiUpdateWithoutResultInputSchema),z.lazy(() => IndeksKamiUncheckedUpdateWithoutResultInputSchema) ]),
  create: z.union([ z.lazy(() => IndeksKamiCreateWithoutResultInputSchema),z.lazy(() => IndeksKamiUncheckedCreateWithoutResultInputSchema) ]),
}).strict();

export const IndeksKamiUpdateWithoutResultInputSchema: z.ZodType<Prisma.IndeksKamiUpdateWithoutResultInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => IndeksKamiCategoryUpdateOneWithoutIndeksKamiNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutAsesiNestedInputSchema).optional(),
  asesi: z.lazy(() => UserUpdateOneWithoutAsesiNestedInputSchema).optional(),
  asesor: z.lazy(() => UserUpdateOneWithoutAsesorNestedInputSchema).optional(),
}).strict();

export const IndeksKamiUncheckedUpdateWithoutResultInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedUpdateWithoutResultInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asesiId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  asesorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IndeksKamiTemplateUpsertWithoutResultInputSchema: z.ZodType<Prisma.IndeksKamiTemplateUpsertWithoutResultInput> = z.object({
  update: z.union([ z.lazy(() => IndeksKamiTemplateUpdateWithoutResultInputSchema),z.lazy(() => IndeksKamiTemplateUncheckedUpdateWithoutResultInputSchema) ]),
  create: z.union([ z.lazy(() => IndeksKamiTemplateCreateWithoutResultInputSchema),z.lazy(() => IndeksKamiTemplateUncheckedCreateWithoutResultInputSchema) ]),
}).strict();

export const IndeksKamiTemplateUpdateWithoutResultInputSchema: z.ZodType<Prisma.IndeksKamiTemplateUpdateWithoutResultInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  header: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  step: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  example: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndeksKamiTemplateUncheckedUpdateWithoutResultInputSchema: z.ZodType<Prisma.IndeksKamiTemplateUncheckedUpdateWithoutResultInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  header: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  step: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  question: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  example: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  options: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndeksKamiCreateManyAsesiInputSchema: z.ZodType<Prisma.IndeksKamiCreateManyAsesiInput> = z.object({
  id: z.string().uuid().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  unitId: z.string().optional().nullable(),
  asesorId: z.string().optional().nullable(),
}).strict();

export const IndeksKamiCreateManyAsesorInputSchema: z.ZodType<Prisma.IndeksKamiCreateManyAsesorInput> = z.object({
  id: z.string().uuid().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  unitId: z.string().optional().nullable(),
  asesiId: z.string(),
}).strict();

export const CsirtPostCreateManyAuthorInputSchema: z.ZodType<Prisma.CsirtPostCreateManyAuthorInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  thumbnail: z.string().optional().nullable(),
  type: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
}).strict();

export const IndeksKamiUpdateWithoutAsesiInputSchema: z.ZodType<Prisma.IndeksKamiUpdateWithoutAsesiInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => IndeksKamiCategoryUpdateOneWithoutIndeksKamiNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutAsesiNestedInputSchema).optional(),
  asesor: z.lazy(() => UserUpdateOneWithoutAsesorNestedInputSchema).optional(),
  result: z.lazy(() => IndeksKamiDataUpdateManyWithoutIndeksKamiNestedInputSchema).optional(),
}).strict();

export const IndeksKamiUncheckedUpdateWithoutAsesiInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedUpdateWithoutAsesiInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asesorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  result: z.lazy(() => IndeksKamiDataUncheckedUpdateManyWithoutIndeksKamiNestedInputSchema).optional(),
}).strict();

export const IndeksKamiUncheckedUpdateManyWithoutAsesiInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedUpdateManyWithoutAsesiInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asesorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IndeksKamiUpdateWithoutAsesorInputSchema: z.ZodType<Prisma.IndeksKamiUpdateWithoutAsesorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => IndeksKamiCategoryUpdateOneWithoutIndeksKamiNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutAsesiNestedInputSchema).optional(),
  asesi: z.lazy(() => UserUpdateOneWithoutAsesiNestedInputSchema).optional(),
  result: z.lazy(() => IndeksKamiDataUpdateManyWithoutIndeksKamiNestedInputSchema).optional(),
}).strict();

export const IndeksKamiUncheckedUpdateWithoutAsesorInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedUpdateWithoutAsesorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asesiId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  result: z.lazy(() => IndeksKamiDataUncheckedUpdateManyWithoutIndeksKamiNestedInputSchema).optional(),
}).strict();

export const IndeksKamiUncheckedUpdateManyWithoutAsesorInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedUpdateManyWithoutAsesorInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asesiId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CsirtPostUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CsirtPostUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => CsirtCategoryUpdateOneWithoutCsirtNestedInputSchema).optional(),
}).strict();

export const CsirtPostUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.CsirtPostUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CsirtPostUncheckedUpdateManyWithoutCsirtPostInputSchema: z.ZodType<Prisma.CsirtPostUncheckedUpdateManyWithoutCsirtPostInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateManyRoleInputSchema: z.ZodType<Prisma.UserCreateManyRoleInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  unitId: z.string().optional().nullable(),
  devicesId: z.string().optional().nullable(),
}).strict();

export const UserUpdateWithoutRoleInputSchema: z.ZodType<Prisma.UserUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unit: z.lazy(() => UnitUpdateOneWithoutUserNestedInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUpdateManyWithoutAsesiNestedInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiUpdateManyWithoutAsesorNestedInputSchema).optional(),
  Devices: z.lazy(() => DevicesUpdateOneWithoutUserNestedInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUpdateManyWithoutAuthorNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  devicesId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Asesi: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutAsesiNestedInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutAsesorNestedInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  devicesId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateManyUnitInputSchema: z.ZodType<Prisma.UserCreateManyUnitInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  roleId: z.string().optional().nullable(),
  devicesId: z.string().optional().nullable(),
}).strict();

export const SiteCreateManyUnitInputSchema: z.ZodType<Prisma.SiteCreateManyUnitInput> = z.object({
  id: z.string().uuid().optional(),
  url: z.string().optional().nullable(),
  ip: z.string().optional().nullable(),
  localIp: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  scanAt: z.coerce.date().optional().nullable(),
}).strict();

export const CertificateCreateManyUnitInputSchema: z.ZodType<Prisma.CertificateCreateManyUnitInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  nip: z.string().optional().nullable(),
  nik: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  jabatan: z.string().optional().nullable(),
  organisasiUnit: z.string().optional().nullable(),
  status: z.string(),
  certificateStatus: z.string(),
  notBeforeDate: z.coerce.date().optional().nullable(),
  notAfterDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const IndeksKamiCreateManyUnitInputSchema: z.ZodType<Prisma.IndeksKamiCreateManyUnitInput> = z.object({
  id: z.string().uuid().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  asesiId: z.string(),
  asesorId: z.string().optional().nullable(),
}).strict();

export const HelpdeskCreateManyUnitInputSchema: z.ZodType<Prisma.HelpdeskCreateManyUnitInput> = z.object({
  id: z.string().uuid().optional(),
  subject: z.string(),
  content: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
  slug: z.string().optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
}).strict();

export const UserUpdateWithoutUnitInputSchema: z.ZodType<Prisma.UserUpdateWithoutUnitInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.lazy(() => RoleUpdateOneWithoutUserNestedInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUpdateManyWithoutAsesiNestedInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiUpdateManyWithoutAsesorNestedInputSchema).optional(),
  Devices: z.lazy(() => DevicesUpdateOneWithoutUserNestedInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUpdateManyWithoutAuthorNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutUnitInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUnitInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  devicesId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Asesi: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutAsesiNestedInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutAsesorNestedInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
}).strict();

export const SiteUpdateWithoutUnitInputSchema: z.ZodType<Prisma.SiteUpdateWithoutUnitInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localIp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scanAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  siteAudit: z.lazy(() => SiteAuditUpdateManyWithoutSiteNestedInputSchema).optional(),
}).strict();

export const SiteUncheckedUpdateWithoutUnitInputSchema: z.ZodType<Prisma.SiteUncheckedUpdateWithoutUnitInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localIp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scanAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  siteAudit: z.lazy(() => SiteAuditUncheckedUpdateManyWithoutSiteNestedInputSchema).optional(),
}).strict();

export const SiteUncheckedUpdateManyWithoutSiteInputSchema: z.ZodType<Prisma.SiteUncheckedUpdateManyWithoutSiteInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  localIp: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  scanAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CertificateUpdateWithoutUnitInputSchema: z.ZodType<Prisma.CertificateUpdateWithoutUnitInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nik: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  jabatan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organisasiUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notBeforeDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notAfterDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CertificateUncheckedUpdateWithoutUnitInputSchema: z.ZodType<Prisma.CertificateUncheckedUpdateWithoutUnitInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nik: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  jabatan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organisasiUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notBeforeDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notAfterDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CertificateUncheckedUpdateManyWithoutCertificateInputSchema: z.ZodType<Prisma.CertificateUncheckedUpdateManyWithoutCertificateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nip: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nik: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  jabatan: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  organisasiUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notBeforeDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notAfterDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndeksKamiUpdateWithoutUnitInputSchema: z.ZodType<Prisma.IndeksKamiUpdateWithoutUnitInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => IndeksKamiCategoryUpdateOneWithoutIndeksKamiNestedInputSchema).optional(),
  asesi: z.lazy(() => UserUpdateOneWithoutAsesiNestedInputSchema).optional(),
  asesor: z.lazy(() => UserUpdateOneWithoutAsesorNestedInputSchema).optional(),
  result: z.lazy(() => IndeksKamiDataUpdateManyWithoutIndeksKamiNestedInputSchema).optional(),
}).strict();

export const IndeksKamiUncheckedUpdateWithoutUnitInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedUpdateWithoutUnitInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asesiId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  asesorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  result: z.lazy(() => IndeksKamiDataUncheckedUpdateManyWithoutIndeksKamiNestedInputSchema).optional(),
}).strict();

export const HelpdeskUpdateWithoutUnitInputSchema: z.ZodType<Prisma.HelpdeskUpdateWithoutUnitInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => HelpdeskCategoryUpdateOneWithoutHelpdeskNestedInputSchema).optional(),
}).strict();

export const HelpdeskUncheckedUpdateWithoutUnitInputSchema: z.ZodType<Prisma.HelpdeskUncheckedUpdateWithoutUnitInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HelpdeskUncheckedUpdateManyWithoutHelpdeskInputSchema: z.ZodType<Prisma.HelpdeskUncheckedUpdateManyWithoutHelpdeskInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateManyDevicesInputSchema: z.ZodType<Prisma.UserCreateManyDevicesInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email(),
  name: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  roleId: z.string().optional().nullable(),
  unitId: z.string().optional().nullable(),
}).strict();

export const UserUpdateWithoutDevicesInputSchema: z.ZodType<Prisma.UserUpdateWithoutDevicesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.lazy(() => RoleUpdateOneWithoutUserNestedInputSchema).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutUserNestedInputSchema).optional(),
  Asesi: z.lazy(() => IndeksKamiUpdateManyWithoutAsesiNestedInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiUpdateManyWithoutAsesorNestedInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUpdateManyWithoutAuthorNestedInputSchema).optional(),
}).strict();

export const UserUncheckedUpdateWithoutDevicesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDevicesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  position: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roleId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Asesi: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutAsesiNestedInputSchema).optional(),
  Asesor: z.lazy(() => IndeksKamiUncheckedUpdateManyWithoutAsesorNestedInputSchema).optional(),
  CsirtPost: z.lazy(() => CsirtPostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
}).strict();

export const SiteAuditCreateManySiteInputSchema: z.ZodType<Prisma.SiteAuditCreateManySiteInput> = z.object({
  id: z.string().uuid().optional(),
  screenshot: z.string().optional().nullable(),
  loadedTime: z.number().optional(),
  loadedSize: z.number().optional(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export const SiteAuditUpdateWithoutSiteInputSchema: z.ZodType<Prisma.SiteAuditUpdateWithoutSiteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  screenshot: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loadedTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loadedSize: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SiteAuditUncheckedUpdateWithoutSiteInputSchema: z.ZodType<Prisma.SiteAuditUncheckedUpdateWithoutSiteInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  screenshot: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loadedTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loadedSize: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SiteAuditUncheckedUpdateManyWithoutSiteAuditInputSchema: z.ZodType<Prisma.SiteAuditUncheckedUpdateManyWithoutSiteAuditInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  screenshot: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  loadedTime: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  loadedSize: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CsirtPostCreateManyCategoryInputSchema: z.ZodType<Prisma.CsirtPostCreateManyCategoryInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  thumbnail: z.string().optional().nullable(),
  type: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string().optional().nullable(),
}).strict();

export const CsirtPostUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.CsirtPostUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneWithoutCsirtPostNestedInputSchema).optional(),
}).strict();

export const CsirtPostUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.CsirtPostUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CsirtPostUncheckedUpdateManyWithoutCsirtInputSchema: z.ZodType<Prisma.CsirtPostUncheckedUpdateManyWithoutCsirtInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HelpdeskCreateManyCategoryInputSchema: z.ZodType<Prisma.HelpdeskCreateManyCategoryInput> = z.object({
  id: z.string().uuid().optional(),
  subject: z.string(),
  content: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable(),
  slug: z.string().optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  unitId: z.string(),
}).strict();

export const HelpdeskUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.HelpdeskUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.lazy(() => UnitUpdateOneRequiredWithoutHelpdeskNestedInputSchema).optional(),
}).strict();

export const HelpdeskUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.HelpdeskUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  unitId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IndeksKamiDataCreateManyIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiDataCreateManyIndeksKamiInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.string().optional(),
  value: z.number().optional().nullable(),
  file: z.string().optional().nullable(),
  filename: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  category: z.number(),
  code: z.string(),
  part: z.string().optional().nullable(),
  step: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  templateId: z.string().optional().nullable(),
}).strict();

export const IndeksKamiDataUpdateWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiDataUpdateWithoutIndeksKamiInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  file: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  filename: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  step: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  template: z.lazy(() => IndeksKamiTemplateUpdateOneWithoutResultNestedInputSchema).optional(),
}).strict();

export const IndeksKamiDataUncheckedUpdateWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiDataUncheckedUpdateWithoutIndeksKamiInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  file: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  filename: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  step: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IndeksKamiDataUncheckedUpdateManyWithoutResultInputSchema: z.ZodType<Prisma.IndeksKamiDataUncheckedUpdateManyWithoutResultInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  file: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  filename: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  step: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  templateId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IndeksKamiCreateManyCategoryInputSchema: z.ZodType<Prisma.IndeksKamiCreateManyCategoryInput> = z.object({
  id: z.string().uuid().optional(),
  version: z.string().optional(),
  scope: z.string(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  unitId: z.string().optional().nullable(),
  asesiId: z.string(),
  asesorId: z.string().optional().nullable(),
}).strict();

export const IndeksKamiUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.IndeksKamiUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.lazy(() => UnitUpdateOneWithoutAsesiNestedInputSchema).optional(),
  asesi: z.lazy(() => UserUpdateOneWithoutAsesiNestedInputSchema).optional(),
  asesor: z.lazy(() => UserUpdateOneWithoutAsesorNestedInputSchema).optional(),
  result: z.lazy(() => IndeksKamiDataUpdateManyWithoutIndeksKamiNestedInputSchema).optional(),
}).strict();

export const IndeksKamiUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asesiId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  asesorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  result: z.lazy(() => IndeksKamiDataUncheckedUpdateManyWithoutIndeksKamiNestedInputSchema).optional(),
}).strict();

export const IndeksKamiUncheckedUpdateManyWithoutIndeksKamiInputSchema: z.ZodType<Prisma.IndeksKamiUncheckedUpdateManyWithoutIndeksKamiInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  scope: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  summaryAsesi: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  summaryAsesor: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  unitId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asesiId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  asesorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IndeksKamiDataCreateManyTemplateInputSchema: z.ZodType<Prisma.IndeksKamiDataCreateManyTemplateInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.string().optional(),
  value: z.number().optional().nullable(),
  file: z.string().optional().nullable(),
  filename: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  category: z.number(),
  code: z.string(),
  part: z.string().optional().nullable(),
  step: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  indeksId: z.string().optional().nullable(),
}).strict();

export const IndeksKamiDataUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.IndeksKamiDataUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  file: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  filename: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  step: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  IndeksKami: z.lazy(() => IndeksKamiUpdateOneWithoutResultNestedInputSchema).optional(),
}).strict();

export const IndeksKamiDataUncheckedUpdateWithoutTemplateInputSchema: z.ZodType<Prisma.IndeksKamiDataUncheckedUpdateWithoutTemplateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  file: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  filename: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  category: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  step: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  indeksId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const RoleFindFirstArgsSchema: z.ZodType<Prisma.RoleFindFirstArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: RoleScalarFieldEnumSchema.array().optional(),
}).strict()

export const RoleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RoleFindFirstOrThrowArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: RoleScalarFieldEnumSchema.array().optional(),
}).strict()

export const RoleFindManyArgsSchema: z.ZodType<Prisma.RoleFindManyArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: RoleScalarFieldEnumSchema.array().optional(),
}).strict()

export const RoleAggregateArgsSchema: z.ZodType<Prisma.RoleAggregateArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RoleGroupByArgsSchema: z.ZodType<Prisma.RoleGroupByArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithAggregationInputSchema.array(),RoleOrderByWithAggregationInputSchema ]).optional(),
  by: RoleScalarFieldEnumSchema.array(),
  having: RoleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RoleFindUniqueArgsSchema: z.ZodType<Prisma.RoleFindUniqueArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict()

export const RoleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RoleFindUniqueOrThrowArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict()

export const UnitFindFirstArgsSchema: z.ZodType<Prisma.UnitFindFirstArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereInputSchema.optional(),
  orderBy: z.union([ UnitOrderByWithRelationInputSchema.array(),UnitOrderByWithRelationInputSchema ]).optional(),
  cursor: UnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UnitScalarFieldEnumSchema.array().optional(),
}).strict()

export const UnitFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UnitFindFirstOrThrowArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereInputSchema.optional(),
  orderBy: z.union([ UnitOrderByWithRelationInputSchema.array(),UnitOrderByWithRelationInputSchema ]).optional(),
  cursor: UnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UnitScalarFieldEnumSchema.array().optional(),
}).strict()

export const UnitFindManyArgsSchema: z.ZodType<Prisma.UnitFindManyArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereInputSchema.optional(),
  orderBy: z.union([ UnitOrderByWithRelationInputSchema.array(),UnitOrderByWithRelationInputSchema ]).optional(),
  cursor: UnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UnitScalarFieldEnumSchema.array().optional(),
}).strict()

export const UnitAggregateArgsSchema: z.ZodType<Prisma.UnitAggregateArgs> = z.object({
  where: UnitWhereInputSchema.optional(),
  orderBy: z.union([ UnitOrderByWithRelationInputSchema.array(),UnitOrderByWithRelationInputSchema ]).optional(),
  cursor: UnitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UnitGroupByArgsSchema: z.ZodType<Prisma.UnitGroupByArgs> = z.object({
  where: UnitWhereInputSchema.optional(),
  orderBy: z.union([ UnitOrderByWithAggregationInputSchema.array(),UnitOrderByWithAggregationInputSchema ]).optional(),
  by: UnitScalarFieldEnumSchema.array(),
  having: UnitScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UnitFindUniqueArgsSchema: z.ZodType<Prisma.UnitFindUniqueArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereUniqueInputSchema,
}).strict()

export const UnitFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UnitFindUniqueOrThrowArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereUniqueInputSchema,
}).strict()

export const DevicesFindFirstArgsSchema: z.ZodType<Prisma.DevicesFindFirstArgs> = z.object({
  select: DevicesSelectSchema.optional(),
  include: DevicesIncludeSchema.optional(),
  where: DevicesWhereInputSchema.optional(),
  orderBy: z.union([ DevicesOrderByWithRelationInputSchema.array(),DevicesOrderByWithRelationInputSchema ]).optional(),
  cursor: DevicesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: DevicesScalarFieldEnumSchema.array().optional(),
}).strict()

export const DevicesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DevicesFindFirstOrThrowArgs> = z.object({
  select: DevicesSelectSchema.optional(),
  include: DevicesIncludeSchema.optional(),
  where: DevicesWhereInputSchema.optional(),
  orderBy: z.union([ DevicesOrderByWithRelationInputSchema.array(),DevicesOrderByWithRelationInputSchema ]).optional(),
  cursor: DevicesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: DevicesScalarFieldEnumSchema.array().optional(),
}).strict()

export const DevicesFindManyArgsSchema: z.ZodType<Prisma.DevicesFindManyArgs> = z.object({
  select: DevicesSelectSchema.optional(),
  include: DevicesIncludeSchema.optional(),
  where: DevicesWhereInputSchema.optional(),
  orderBy: z.union([ DevicesOrderByWithRelationInputSchema.array(),DevicesOrderByWithRelationInputSchema ]).optional(),
  cursor: DevicesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: DevicesScalarFieldEnumSchema.array().optional(),
}).strict()

export const DevicesAggregateArgsSchema: z.ZodType<Prisma.DevicesAggregateArgs> = z.object({
  where: DevicesWhereInputSchema.optional(),
  orderBy: z.union([ DevicesOrderByWithRelationInputSchema.array(),DevicesOrderByWithRelationInputSchema ]).optional(),
  cursor: DevicesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DevicesGroupByArgsSchema: z.ZodType<Prisma.DevicesGroupByArgs> = z.object({
  where: DevicesWhereInputSchema.optional(),
  orderBy: z.union([ DevicesOrderByWithAggregationInputSchema.array(),DevicesOrderByWithAggregationInputSchema ]).optional(),
  by: DevicesScalarFieldEnumSchema.array(),
  having: DevicesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DevicesFindUniqueArgsSchema: z.ZodType<Prisma.DevicesFindUniqueArgs> = z.object({
  select: DevicesSelectSchema.optional(),
  include: DevicesIncludeSchema.optional(),
  where: DevicesWhereUniqueInputSchema,
}).strict()

export const DevicesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DevicesFindUniqueOrThrowArgs> = z.object({
  select: DevicesSelectSchema.optional(),
  include: DevicesIncludeSchema.optional(),
  where: DevicesWhereUniqueInputSchema,
}).strict()

export const SiteFindFirstArgsSchema: z.ZodType<Prisma.SiteFindFirstArgs> = z.object({
  select: SiteSelectSchema.optional(),
  include: SiteIncludeSchema.optional(),
  where: SiteWhereInputSchema.optional(),
  orderBy: z.union([ SiteOrderByWithRelationInputSchema.array(),SiteOrderByWithRelationInputSchema ]).optional(),
  cursor: SiteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SiteScalarFieldEnumSchema.array().optional(),
}).strict()

export const SiteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SiteFindFirstOrThrowArgs> = z.object({
  select: SiteSelectSchema.optional(),
  include: SiteIncludeSchema.optional(),
  where: SiteWhereInputSchema.optional(),
  orderBy: z.union([ SiteOrderByWithRelationInputSchema.array(),SiteOrderByWithRelationInputSchema ]).optional(),
  cursor: SiteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SiteScalarFieldEnumSchema.array().optional(),
}).strict()

export const SiteFindManyArgsSchema: z.ZodType<Prisma.SiteFindManyArgs> = z.object({
  select: SiteSelectSchema.optional(),
  include: SiteIncludeSchema.optional(),
  where: SiteWhereInputSchema.optional(),
  orderBy: z.union([ SiteOrderByWithRelationInputSchema.array(),SiteOrderByWithRelationInputSchema ]).optional(),
  cursor: SiteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SiteScalarFieldEnumSchema.array().optional(),
}).strict()

export const SiteAggregateArgsSchema: z.ZodType<Prisma.SiteAggregateArgs> = z.object({
  where: SiteWhereInputSchema.optional(),
  orderBy: z.union([ SiteOrderByWithRelationInputSchema.array(),SiteOrderByWithRelationInputSchema ]).optional(),
  cursor: SiteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SiteGroupByArgsSchema: z.ZodType<Prisma.SiteGroupByArgs> = z.object({
  where: SiteWhereInputSchema.optional(),
  orderBy: z.union([ SiteOrderByWithAggregationInputSchema.array(),SiteOrderByWithAggregationInputSchema ]).optional(),
  by: SiteScalarFieldEnumSchema.array(),
  having: SiteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SiteFindUniqueArgsSchema: z.ZodType<Prisma.SiteFindUniqueArgs> = z.object({
  select: SiteSelectSchema.optional(),
  include: SiteIncludeSchema.optional(),
  where: SiteWhereUniqueInputSchema,
}).strict()

export const SiteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SiteFindUniqueOrThrowArgs> = z.object({
  select: SiteSelectSchema.optional(),
  include: SiteIncludeSchema.optional(),
  where: SiteWhereUniqueInputSchema,
}).strict()

export const SiteAuditFindFirstArgsSchema: z.ZodType<Prisma.SiteAuditFindFirstArgs> = z.object({
  select: SiteAuditSelectSchema.optional(),
  include: SiteAuditIncludeSchema.optional(),
  where: SiteAuditWhereInputSchema.optional(),
  orderBy: z.union([ SiteAuditOrderByWithRelationInputSchema.array(),SiteAuditOrderByWithRelationInputSchema ]).optional(),
  cursor: SiteAuditWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SiteAuditScalarFieldEnumSchema.array().optional(),
}).strict()

export const SiteAuditFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SiteAuditFindFirstOrThrowArgs> = z.object({
  select: SiteAuditSelectSchema.optional(),
  include: SiteAuditIncludeSchema.optional(),
  where: SiteAuditWhereInputSchema.optional(),
  orderBy: z.union([ SiteAuditOrderByWithRelationInputSchema.array(),SiteAuditOrderByWithRelationInputSchema ]).optional(),
  cursor: SiteAuditWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SiteAuditScalarFieldEnumSchema.array().optional(),
}).strict()

export const SiteAuditFindManyArgsSchema: z.ZodType<Prisma.SiteAuditFindManyArgs> = z.object({
  select: SiteAuditSelectSchema.optional(),
  include: SiteAuditIncludeSchema.optional(),
  where: SiteAuditWhereInputSchema.optional(),
  orderBy: z.union([ SiteAuditOrderByWithRelationInputSchema.array(),SiteAuditOrderByWithRelationInputSchema ]).optional(),
  cursor: SiteAuditWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: SiteAuditScalarFieldEnumSchema.array().optional(),
}).strict()

export const SiteAuditAggregateArgsSchema: z.ZodType<Prisma.SiteAuditAggregateArgs> = z.object({
  where: SiteAuditWhereInputSchema.optional(),
  orderBy: z.union([ SiteAuditOrderByWithRelationInputSchema.array(),SiteAuditOrderByWithRelationInputSchema ]).optional(),
  cursor: SiteAuditWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SiteAuditGroupByArgsSchema: z.ZodType<Prisma.SiteAuditGroupByArgs> = z.object({
  where: SiteAuditWhereInputSchema.optional(),
  orderBy: z.union([ SiteAuditOrderByWithAggregationInputSchema.array(),SiteAuditOrderByWithAggregationInputSchema ]).optional(),
  by: SiteAuditScalarFieldEnumSchema.array(),
  having: SiteAuditScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SiteAuditFindUniqueArgsSchema: z.ZodType<Prisma.SiteAuditFindUniqueArgs> = z.object({
  select: SiteAuditSelectSchema.optional(),
  include: SiteAuditIncludeSchema.optional(),
  where: SiteAuditWhereUniqueInputSchema,
}).strict()

export const SiteAuditFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SiteAuditFindUniqueOrThrowArgs> = z.object({
  select: SiteAuditSelectSchema.optional(),
  include: SiteAuditIncludeSchema.optional(),
  where: SiteAuditWhereUniqueInputSchema,
}).strict()

export const CertificateFindFirstArgsSchema: z.ZodType<Prisma.CertificateFindFirstArgs> = z.object({
  select: CertificateSelectSchema.optional(),
  include: CertificateIncludeSchema.optional(),
  where: CertificateWhereInputSchema.optional(),
  orderBy: z.union([ CertificateOrderByWithRelationInputSchema.array(),CertificateOrderByWithRelationInputSchema ]).optional(),
  cursor: CertificateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CertificateScalarFieldEnumSchema.array().optional(),
}).strict()

export const CertificateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CertificateFindFirstOrThrowArgs> = z.object({
  select: CertificateSelectSchema.optional(),
  include: CertificateIncludeSchema.optional(),
  where: CertificateWhereInputSchema.optional(),
  orderBy: z.union([ CertificateOrderByWithRelationInputSchema.array(),CertificateOrderByWithRelationInputSchema ]).optional(),
  cursor: CertificateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CertificateScalarFieldEnumSchema.array().optional(),
}).strict()

export const CertificateFindManyArgsSchema: z.ZodType<Prisma.CertificateFindManyArgs> = z.object({
  select: CertificateSelectSchema.optional(),
  include: CertificateIncludeSchema.optional(),
  where: CertificateWhereInputSchema.optional(),
  orderBy: z.union([ CertificateOrderByWithRelationInputSchema.array(),CertificateOrderByWithRelationInputSchema ]).optional(),
  cursor: CertificateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CertificateScalarFieldEnumSchema.array().optional(),
}).strict()

export const CertificateAggregateArgsSchema: z.ZodType<Prisma.CertificateAggregateArgs> = z.object({
  where: CertificateWhereInputSchema.optional(),
  orderBy: z.union([ CertificateOrderByWithRelationInputSchema.array(),CertificateOrderByWithRelationInputSchema ]).optional(),
  cursor: CertificateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CertificateGroupByArgsSchema: z.ZodType<Prisma.CertificateGroupByArgs> = z.object({
  where: CertificateWhereInputSchema.optional(),
  orderBy: z.union([ CertificateOrderByWithAggregationInputSchema.array(),CertificateOrderByWithAggregationInputSchema ]).optional(),
  by: CertificateScalarFieldEnumSchema.array(),
  having: CertificateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CertificateFindUniqueArgsSchema: z.ZodType<Prisma.CertificateFindUniqueArgs> = z.object({
  select: CertificateSelectSchema.optional(),
  include: CertificateIncludeSchema.optional(),
  where: CertificateWhereUniqueInputSchema,
}).strict()

export const CertificateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CertificateFindUniqueOrThrowArgs> = z.object({
  select: CertificateSelectSchema.optional(),
  include: CertificateIncludeSchema.optional(),
  where: CertificateWhereUniqueInputSchema,
}).strict()

export const FortigateFindFirstArgsSchema: z.ZodType<Prisma.FortigateFindFirstArgs> = z.object({
  select: FortigateSelectSchema.optional(),
  where: FortigateWhereInputSchema.optional(),
  orderBy: z.union([ FortigateOrderByWithRelationInputSchema.array(),FortigateOrderByWithRelationInputSchema ]).optional(),
  cursor: FortigateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FortigateScalarFieldEnumSchema.array().optional(),
}).strict()

export const FortigateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FortigateFindFirstOrThrowArgs> = z.object({
  select: FortigateSelectSchema.optional(),
  where: FortigateWhereInputSchema.optional(),
  orderBy: z.union([ FortigateOrderByWithRelationInputSchema.array(),FortigateOrderByWithRelationInputSchema ]).optional(),
  cursor: FortigateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FortigateScalarFieldEnumSchema.array().optional(),
}).strict()

export const FortigateFindManyArgsSchema: z.ZodType<Prisma.FortigateFindManyArgs> = z.object({
  select: FortigateSelectSchema.optional(),
  where: FortigateWhereInputSchema.optional(),
  orderBy: z.union([ FortigateOrderByWithRelationInputSchema.array(),FortigateOrderByWithRelationInputSchema ]).optional(),
  cursor: FortigateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: FortigateScalarFieldEnumSchema.array().optional(),
}).strict()

export const FortigateAggregateArgsSchema: z.ZodType<Prisma.FortigateAggregateArgs> = z.object({
  where: FortigateWhereInputSchema.optional(),
  orderBy: z.union([ FortigateOrderByWithRelationInputSchema.array(),FortigateOrderByWithRelationInputSchema ]).optional(),
  cursor: FortigateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FortigateGroupByArgsSchema: z.ZodType<Prisma.FortigateGroupByArgs> = z.object({
  where: FortigateWhereInputSchema.optional(),
  orderBy: z.union([ FortigateOrderByWithAggregationInputSchema.array(),FortigateOrderByWithAggregationInputSchema ]).optional(),
  by: FortigateScalarFieldEnumSchema.array(),
  having: FortigateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const FortigateFindUniqueArgsSchema: z.ZodType<Prisma.FortigateFindUniqueArgs> = z.object({
  select: FortigateSelectSchema.optional(),
  where: FortigateWhereUniqueInputSchema,
}).strict()

export const FortigateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FortigateFindUniqueOrThrowArgs> = z.object({
  select: FortigateSelectSchema.optional(),
  where: FortigateWhereUniqueInputSchema,
}).strict()

export const CsirtPostFindFirstArgsSchema: z.ZodType<Prisma.CsirtPostFindFirstArgs> = z.object({
  select: CsirtPostSelectSchema.optional(),
  include: CsirtPostIncludeSchema.optional(),
  where: CsirtPostWhereInputSchema.optional(),
  orderBy: z.union([ CsirtPostOrderByWithRelationInputSchema.array(),CsirtPostOrderByWithRelationInputSchema ]).optional(),
  cursor: CsirtPostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CsirtPostScalarFieldEnumSchema.array().optional(),
}).strict()

export const CsirtPostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CsirtPostFindFirstOrThrowArgs> = z.object({
  select: CsirtPostSelectSchema.optional(),
  include: CsirtPostIncludeSchema.optional(),
  where: CsirtPostWhereInputSchema.optional(),
  orderBy: z.union([ CsirtPostOrderByWithRelationInputSchema.array(),CsirtPostOrderByWithRelationInputSchema ]).optional(),
  cursor: CsirtPostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CsirtPostScalarFieldEnumSchema.array().optional(),
}).strict()

export const CsirtPostFindManyArgsSchema: z.ZodType<Prisma.CsirtPostFindManyArgs> = z.object({
  select: CsirtPostSelectSchema.optional(),
  include: CsirtPostIncludeSchema.optional(),
  where: CsirtPostWhereInputSchema.optional(),
  orderBy: z.union([ CsirtPostOrderByWithRelationInputSchema.array(),CsirtPostOrderByWithRelationInputSchema ]).optional(),
  cursor: CsirtPostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CsirtPostScalarFieldEnumSchema.array().optional(),
}).strict()

export const CsirtPostAggregateArgsSchema: z.ZodType<Prisma.CsirtPostAggregateArgs> = z.object({
  where: CsirtPostWhereInputSchema.optional(),
  orderBy: z.union([ CsirtPostOrderByWithRelationInputSchema.array(),CsirtPostOrderByWithRelationInputSchema ]).optional(),
  cursor: CsirtPostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CsirtPostGroupByArgsSchema: z.ZodType<Prisma.CsirtPostGroupByArgs> = z.object({
  where: CsirtPostWhereInputSchema.optional(),
  orderBy: z.union([ CsirtPostOrderByWithAggregationInputSchema.array(),CsirtPostOrderByWithAggregationInputSchema ]).optional(),
  by: CsirtPostScalarFieldEnumSchema.array(),
  having: CsirtPostScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CsirtPostFindUniqueArgsSchema: z.ZodType<Prisma.CsirtPostFindUniqueArgs> = z.object({
  select: CsirtPostSelectSchema.optional(),
  include: CsirtPostIncludeSchema.optional(),
  where: CsirtPostWhereUniqueInputSchema,
}).strict()

export const CsirtPostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CsirtPostFindUniqueOrThrowArgs> = z.object({
  select: CsirtPostSelectSchema.optional(),
  include: CsirtPostIncludeSchema.optional(),
  where: CsirtPostWhereUniqueInputSchema,
}).strict()

export const CsirtCategoryFindFirstArgsSchema: z.ZodType<Prisma.CsirtCategoryFindFirstArgs> = z.object({
  select: CsirtCategorySelectSchema.optional(),
  include: CsirtCategoryIncludeSchema.optional(),
  where: CsirtCategoryWhereInputSchema.optional(),
  orderBy: z.union([ CsirtCategoryOrderByWithRelationInputSchema.array(),CsirtCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CsirtCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CsirtCategoryScalarFieldEnumSchema.array().optional(),
}).strict()

export const CsirtCategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CsirtCategoryFindFirstOrThrowArgs> = z.object({
  select: CsirtCategorySelectSchema.optional(),
  include: CsirtCategoryIncludeSchema.optional(),
  where: CsirtCategoryWhereInputSchema.optional(),
  orderBy: z.union([ CsirtCategoryOrderByWithRelationInputSchema.array(),CsirtCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CsirtCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CsirtCategoryScalarFieldEnumSchema.array().optional(),
}).strict()

export const CsirtCategoryFindManyArgsSchema: z.ZodType<Prisma.CsirtCategoryFindManyArgs> = z.object({
  select: CsirtCategorySelectSchema.optional(),
  include: CsirtCategoryIncludeSchema.optional(),
  where: CsirtCategoryWhereInputSchema.optional(),
  orderBy: z.union([ CsirtCategoryOrderByWithRelationInputSchema.array(),CsirtCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CsirtCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: CsirtCategoryScalarFieldEnumSchema.array().optional(),
}).strict()

export const CsirtCategoryAggregateArgsSchema: z.ZodType<Prisma.CsirtCategoryAggregateArgs> = z.object({
  where: CsirtCategoryWhereInputSchema.optional(),
  orderBy: z.union([ CsirtCategoryOrderByWithRelationInputSchema.array(),CsirtCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CsirtCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CsirtCategoryGroupByArgsSchema: z.ZodType<Prisma.CsirtCategoryGroupByArgs> = z.object({
  where: CsirtCategoryWhereInputSchema.optional(),
  orderBy: z.union([ CsirtCategoryOrderByWithAggregationInputSchema.array(),CsirtCategoryOrderByWithAggregationInputSchema ]).optional(),
  by: CsirtCategoryScalarFieldEnumSchema.array(),
  having: CsirtCategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CsirtCategoryFindUniqueArgsSchema: z.ZodType<Prisma.CsirtCategoryFindUniqueArgs> = z.object({
  select: CsirtCategorySelectSchema.optional(),
  include: CsirtCategoryIncludeSchema.optional(),
  where: CsirtCategoryWhereUniqueInputSchema,
}).strict()

export const CsirtCategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CsirtCategoryFindUniqueOrThrowArgs> = z.object({
  select: CsirtCategorySelectSchema.optional(),
  include: CsirtCategoryIncludeSchema.optional(),
  where: CsirtCategoryWhereUniqueInputSchema,
}).strict()

export const HelpdeskFindFirstArgsSchema: z.ZodType<Prisma.HelpdeskFindFirstArgs> = z.object({
  select: HelpdeskSelectSchema.optional(),
  include: HelpdeskIncludeSchema.optional(),
  where: HelpdeskWhereInputSchema.optional(),
  orderBy: z.union([ HelpdeskOrderByWithRelationInputSchema.array(),HelpdeskOrderByWithRelationInputSchema ]).optional(),
  cursor: HelpdeskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: HelpdeskScalarFieldEnumSchema.array().optional(),
}).strict()

export const HelpdeskFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HelpdeskFindFirstOrThrowArgs> = z.object({
  select: HelpdeskSelectSchema.optional(),
  include: HelpdeskIncludeSchema.optional(),
  where: HelpdeskWhereInputSchema.optional(),
  orderBy: z.union([ HelpdeskOrderByWithRelationInputSchema.array(),HelpdeskOrderByWithRelationInputSchema ]).optional(),
  cursor: HelpdeskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: HelpdeskScalarFieldEnumSchema.array().optional(),
}).strict()

export const HelpdeskFindManyArgsSchema: z.ZodType<Prisma.HelpdeskFindManyArgs> = z.object({
  select: HelpdeskSelectSchema.optional(),
  include: HelpdeskIncludeSchema.optional(),
  where: HelpdeskWhereInputSchema.optional(),
  orderBy: z.union([ HelpdeskOrderByWithRelationInputSchema.array(),HelpdeskOrderByWithRelationInputSchema ]).optional(),
  cursor: HelpdeskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: HelpdeskScalarFieldEnumSchema.array().optional(),
}).strict()

export const HelpdeskAggregateArgsSchema: z.ZodType<Prisma.HelpdeskAggregateArgs> = z.object({
  where: HelpdeskWhereInputSchema.optional(),
  orderBy: z.union([ HelpdeskOrderByWithRelationInputSchema.array(),HelpdeskOrderByWithRelationInputSchema ]).optional(),
  cursor: HelpdeskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const HelpdeskGroupByArgsSchema: z.ZodType<Prisma.HelpdeskGroupByArgs> = z.object({
  where: HelpdeskWhereInputSchema.optional(),
  orderBy: z.union([ HelpdeskOrderByWithAggregationInputSchema.array(),HelpdeskOrderByWithAggregationInputSchema ]).optional(),
  by: HelpdeskScalarFieldEnumSchema.array(),
  having: HelpdeskScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const HelpdeskFindUniqueArgsSchema: z.ZodType<Prisma.HelpdeskFindUniqueArgs> = z.object({
  select: HelpdeskSelectSchema.optional(),
  include: HelpdeskIncludeSchema.optional(),
  where: HelpdeskWhereUniqueInputSchema,
}).strict()

export const HelpdeskFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HelpdeskFindUniqueOrThrowArgs> = z.object({
  select: HelpdeskSelectSchema.optional(),
  include: HelpdeskIncludeSchema.optional(),
  where: HelpdeskWhereUniqueInputSchema,
}).strict()

export const HelpdeskCategoryFindFirstArgsSchema: z.ZodType<Prisma.HelpdeskCategoryFindFirstArgs> = z.object({
  select: HelpdeskCategorySelectSchema.optional(),
  include: HelpdeskCategoryIncludeSchema.optional(),
  where: HelpdeskCategoryWhereInputSchema.optional(),
  orderBy: z.union([ HelpdeskCategoryOrderByWithRelationInputSchema.array(),HelpdeskCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: HelpdeskCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: HelpdeskCategoryScalarFieldEnumSchema.array().optional(),
}).strict()

export const HelpdeskCategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HelpdeskCategoryFindFirstOrThrowArgs> = z.object({
  select: HelpdeskCategorySelectSchema.optional(),
  include: HelpdeskCategoryIncludeSchema.optional(),
  where: HelpdeskCategoryWhereInputSchema.optional(),
  orderBy: z.union([ HelpdeskCategoryOrderByWithRelationInputSchema.array(),HelpdeskCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: HelpdeskCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: HelpdeskCategoryScalarFieldEnumSchema.array().optional(),
}).strict()

export const HelpdeskCategoryFindManyArgsSchema: z.ZodType<Prisma.HelpdeskCategoryFindManyArgs> = z.object({
  select: HelpdeskCategorySelectSchema.optional(),
  include: HelpdeskCategoryIncludeSchema.optional(),
  where: HelpdeskCategoryWhereInputSchema.optional(),
  orderBy: z.union([ HelpdeskCategoryOrderByWithRelationInputSchema.array(),HelpdeskCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: HelpdeskCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: HelpdeskCategoryScalarFieldEnumSchema.array().optional(),
}).strict()

export const HelpdeskCategoryAggregateArgsSchema: z.ZodType<Prisma.HelpdeskCategoryAggregateArgs> = z.object({
  where: HelpdeskCategoryWhereInputSchema.optional(),
  orderBy: z.union([ HelpdeskCategoryOrderByWithRelationInputSchema.array(),HelpdeskCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: HelpdeskCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const HelpdeskCategoryGroupByArgsSchema: z.ZodType<Prisma.HelpdeskCategoryGroupByArgs> = z.object({
  where: HelpdeskCategoryWhereInputSchema.optional(),
  orderBy: z.union([ HelpdeskCategoryOrderByWithAggregationInputSchema.array(),HelpdeskCategoryOrderByWithAggregationInputSchema ]).optional(),
  by: HelpdeskCategoryScalarFieldEnumSchema.array(),
  having: HelpdeskCategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const HelpdeskCategoryFindUniqueArgsSchema: z.ZodType<Prisma.HelpdeskCategoryFindUniqueArgs> = z.object({
  select: HelpdeskCategorySelectSchema.optional(),
  include: HelpdeskCategoryIncludeSchema.optional(),
  where: HelpdeskCategoryWhereUniqueInputSchema,
}).strict()

export const HelpdeskCategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HelpdeskCategoryFindUniqueOrThrowArgs> = z.object({
  select: HelpdeskCategorySelectSchema.optional(),
  include: HelpdeskCategoryIncludeSchema.optional(),
  where: HelpdeskCategoryWhereUniqueInputSchema,
}).strict()

export const IndeksKamiFindFirstArgsSchema: z.ZodType<Prisma.IndeksKamiFindFirstArgs> = z.object({
  select: IndeksKamiSelectSchema.optional(),
  include: IndeksKamiIncludeSchema.optional(),
  where: IndeksKamiWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiOrderByWithRelationInputSchema.array(),IndeksKamiOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IndeksKamiScalarFieldEnumSchema.array().optional(),
}).strict()

export const IndeksKamiFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IndeksKamiFindFirstOrThrowArgs> = z.object({
  select: IndeksKamiSelectSchema.optional(),
  include: IndeksKamiIncludeSchema.optional(),
  where: IndeksKamiWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiOrderByWithRelationInputSchema.array(),IndeksKamiOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IndeksKamiScalarFieldEnumSchema.array().optional(),
}).strict()

export const IndeksKamiFindManyArgsSchema: z.ZodType<Prisma.IndeksKamiFindManyArgs> = z.object({
  select: IndeksKamiSelectSchema.optional(),
  include: IndeksKamiIncludeSchema.optional(),
  where: IndeksKamiWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiOrderByWithRelationInputSchema.array(),IndeksKamiOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IndeksKamiScalarFieldEnumSchema.array().optional(),
}).strict()

export const IndeksKamiAggregateArgsSchema: z.ZodType<Prisma.IndeksKamiAggregateArgs> = z.object({
  where: IndeksKamiWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiOrderByWithRelationInputSchema.array(),IndeksKamiOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const IndeksKamiGroupByArgsSchema: z.ZodType<Prisma.IndeksKamiGroupByArgs> = z.object({
  where: IndeksKamiWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiOrderByWithAggregationInputSchema.array(),IndeksKamiOrderByWithAggregationInputSchema ]).optional(),
  by: IndeksKamiScalarFieldEnumSchema.array(),
  having: IndeksKamiScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const IndeksKamiFindUniqueArgsSchema: z.ZodType<Prisma.IndeksKamiFindUniqueArgs> = z.object({
  select: IndeksKamiSelectSchema.optional(),
  include: IndeksKamiIncludeSchema.optional(),
  where: IndeksKamiWhereUniqueInputSchema,
}).strict()

export const IndeksKamiFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IndeksKamiFindUniqueOrThrowArgs> = z.object({
  select: IndeksKamiSelectSchema.optional(),
  include: IndeksKamiIncludeSchema.optional(),
  where: IndeksKamiWhereUniqueInputSchema,
}).strict()

export const IndeksKamiCategoryFindFirstArgsSchema: z.ZodType<Prisma.IndeksKamiCategoryFindFirstArgs> = z.object({
  select: IndeksKamiCategorySelectSchema.optional(),
  include: IndeksKamiCategoryIncludeSchema.optional(),
  where: IndeksKamiCategoryWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiCategoryOrderByWithRelationInputSchema.array(),IndeksKamiCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IndeksKamiCategoryScalarFieldEnumSchema.array().optional(),
}).strict()

export const IndeksKamiCategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IndeksKamiCategoryFindFirstOrThrowArgs> = z.object({
  select: IndeksKamiCategorySelectSchema.optional(),
  include: IndeksKamiCategoryIncludeSchema.optional(),
  where: IndeksKamiCategoryWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiCategoryOrderByWithRelationInputSchema.array(),IndeksKamiCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IndeksKamiCategoryScalarFieldEnumSchema.array().optional(),
}).strict()

export const IndeksKamiCategoryFindManyArgsSchema: z.ZodType<Prisma.IndeksKamiCategoryFindManyArgs> = z.object({
  select: IndeksKamiCategorySelectSchema.optional(),
  include: IndeksKamiCategoryIncludeSchema.optional(),
  where: IndeksKamiCategoryWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiCategoryOrderByWithRelationInputSchema.array(),IndeksKamiCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IndeksKamiCategoryScalarFieldEnumSchema.array().optional(),
}).strict()

export const IndeksKamiCategoryAggregateArgsSchema: z.ZodType<Prisma.IndeksKamiCategoryAggregateArgs> = z.object({
  where: IndeksKamiCategoryWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiCategoryOrderByWithRelationInputSchema.array(),IndeksKamiCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const IndeksKamiCategoryGroupByArgsSchema: z.ZodType<Prisma.IndeksKamiCategoryGroupByArgs> = z.object({
  where: IndeksKamiCategoryWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiCategoryOrderByWithAggregationInputSchema.array(),IndeksKamiCategoryOrderByWithAggregationInputSchema ]).optional(),
  by: IndeksKamiCategoryScalarFieldEnumSchema.array(),
  having: IndeksKamiCategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const IndeksKamiCategoryFindUniqueArgsSchema: z.ZodType<Prisma.IndeksKamiCategoryFindUniqueArgs> = z.object({
  select: IndeksKamiCategorySelectSchema.optional(),
  include: IndeksKamiCategoryIncludeSchema.optional(),
  where: IndeksKamiCategoryWhereUniqueInputSchema,
}).strict()

export const IndeksKamiCategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IndeksKamiCategoryFindUniqueOrThrowArgs> = z.object({
  select: IndeksKamiCategorySelectSchema.optional(),
  include: IndeksKamiCategoryIncludeSchema.optional(),
  where: IndeksKamiCategoryWhereUniqueInputSchema,
}).strict()

export const IndeksKamiCriteriaFindFirstArgsSchema: z.ZodType<Prisma.IndeksKamiCriteriaFindFirstArgs> = z.object({
  select: IndeksKamiCriteriaSelectSchema.optional(),
  where: IndeksKamiCriteriaWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiCriteriaOrderByWithRelationInputSchema.array(),IndeksKamiCriteriaOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiCriteriaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IndeksKamiCriteriaScalarFieldEnumSchema.array().optional(),
}).strict()

export const IndeksKamiCriteriaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IndeksKamiCriteriaFindFirstOrThrowArgs> = z.object({
  select: IndeksKamiCriteriaSelectSchema.optional(),
  where: IndeksKamiCriteriaWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiCriteriaOrderByWithRelationInputSchema.array(),IndeksKamiCriteriaOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiCriteriaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IndeksKamiCriteriaScalarFieldEnumSchema.array().optional(),
}).strict()

export const IndeksKamiCriteriaFindManyArgsSchema: z.ZodType<Prisma.IndeksKamiCriteriaFindManyArgs> = z.object({
  select: IndeksKamiCriteriaSelectSchema.optional(),
  where: IndeksKamiCriteriaWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiCriteriaOrderByWithRelationInputSchema.array(),IndeksKamiCriteriaOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiCriteriaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IndeksKamiCriteriaScalarFieldEnumSchema.array().optional(),
}).strict()

export const IndeksKamiCriteriaAggregateArgsSchema: z.ZodType<Prisma.IndeksKamiCriteriaAggregateArgs> = z.object({
  where: IndeksKamiCriteriaWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiCriteriaOrderByWithRelationInputSchema.array(),IndeksKamiCriteriaOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiCriteriaWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const IndeksKamiCriteriaGroupByArgsSchema: z.ZodType<Prisma.IndeksKamiCriteriaGroupByArgs> = z.object({
  where: IndeksKamiCriteriaWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiCriteriaOrderByWithAggregationInputSchema.array(),IndeksKamiCriteriaOrderByWithAggregationInputSchema ]).optional(),
  by: IndeksKamiCriteriaScalarFieldEnumSchema.array(),
  having: IndeksKamiCriteriaScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const IndeksKamiCriteriaFindUniqueArgsSchema: z.ZodType<Prisma.IndeksKamiCriteriaFindUniqueArgs> = z.object({
  select: IndeksKamiCriteriaSelectSchema.optional(),
  where: IndeksKamiCriteriaWhereUniqueInputSchema,
}).strict()

export const IndeksKamiCriteriaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IndeksKamiCriteriaFindUniqueOrThrowArgs> = z.object({
  select: IndeksKamiCriteriaSelectSchema.optional(),
  where: IndeksKamiCriteriaWhereUniqueInputSchema,
}).strict()

export const IndeksKamiTemplateFindFirstArgsSchema: z.ZodType<Prisma.IndeksKamiTemplateFindFirstArgs> = z.object({
  select: IndeksKamiTemplateSelectSchema.optional(),
  include: IndeksKamiTemplateIncludeSchema.optional(),
  where: IndeksKamiTemplateWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiTemplateOrderByWithRelationInputSchema.array(),IndeksKamiTemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiTemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IndeksKamiTemplateScalarFieldEnumSchema.array().optional(),
}).strict()

export const IndeksKamiTemplateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IndeksKamiTemplateFindFirstOrThrowArgs> = z.object({
  select: IndeksKamiTemplateSelectSchema.optional(),
  include: IndeksKamiTemplateIncludeSchema.optional(),
  where: IndeksKamiTemplateWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiTemplateOrderByWithRelationInputSchema.array(),IndeksKamiTemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiTemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IndeksKamiTemplateScalarFieldEnumSchema.array().optional(),
}).strict()

export const IndeksKamiTemplateFindManyArgsSchema: z.ZodType<Prisma.IndeksKamiTemplateFindManyArgs> = z.object({
  select: IndeksKamiTemplateSelectSchema.optional(),
  include: IndeksKamiTemplateIncludeSchema.optional(),
  where: IndeksKamiTemplateWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiTemplateOrderByWithRelationInputSchema.array(),IndeksKamiTemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiTemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IndeksKamiTemplateScalarFieldEnumSchema.array().optional(),
}).strict()

export const IndeksKamiTemplateAggregateArgsSchema: z.ZodType<Prisma.IndeksKamiTemplateAggregateArgs> = z.object({
  where: IndeksKamiTemplateWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiTemplateOrderByWithRelationInputSchema.array(),IndeksKamiTemplateOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiTemplateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const IndeksKamiTemplateGroupByArgsSchema: z.ZodType<Prisma.IndeksKamiTemplateGroupByArgs> = z.object({
  where: IndeksKamiTemplateWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiTemplateOrderByWithAggregationInputSchema.array(),IndeksKamiTemplateOrderByWithAggregationInputSchema ]).optional(),
  by: IndeksKamiTemplateScalarFieldEnumSchema.array(),
  having: IndeksKamiTemplateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const IndeksKamiTemplateFindUniqueArgsSchema: z.ZodType<Prisma.IndeksKamiTemplateFindUniqueArgs> = z.object({
  select: IndeksKamiTemplateSelectSchema.optional(),
  include: IndeksKamiTemplateIncludeSchema.optional(),
  where: IndeksKamiTemplateWhereUniqueInputSchema,
}).strict()

export const IndeksKamiTemplateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IndeksKamiTemplateFindUniqueOrThrowArgs> = z.object({
  select: IndeksKamiTemplateSelectSchema.optional(),
  include: IndeksKamiTemplateIncludeSchema.optional(),
  where: IndeksKamiTemplateWhereUniqueInputSchema,
}).strict()

export const IndeksKamiDataFindFirstArgsSchema: z.ZodType<Prisma.IndeksKamiDataFindFirstArgs> = z.object({
  select: IndeksKamiDataSelectSchema.optional(),
  include: IndeksKamiDataIncludeSchema.optional(),
  where: IndeksKamiDataWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiDataOrderByWithRelationInputSchema.array(),IndeksKamiDataOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiDataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IndeksKamiDataScalarFieldEnumSchema.array().optional(),
}).strict()

export const IndeksKamiDataFindFirstOrThrowArgsSchema: z.ZodType<Prisma.IndeksKamiDataFindFirstOrThrowArgs> = z.object({
  select: IndeksKamiDataSelectSchema.optional(),
  include: IndeksKamiDataIncludeSchema.optional(),
  where: IndeksKamiDataWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiDataOrderByWithRelationInputSchema.array(),IndeksKamiDataOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiDataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IndeksKamiDataScalarFieldEnumSchema.array().optional(),
}).strict()

export const IndeksKamiDataFindManyArgsSchema: z.ZodType<Prisma.IndeksKamiDataFindManyArgs> = z.object({
  select: IndeksKamiDataSelectSchema.optional(),
  include: IndeksKamiDataIncludeSchema.optional(),
  where: IndeksKamiDataWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiDataOrderByWithRelationInputSchema.array(),IndeksKamiDataOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiDataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: IndeksKamiDataScalarFieldEnumSchema.array().optional(),
}).strict()

export const IndeksKamiDataAggregateArgsSchema: z.ZodType<Prisma.IndeksKamiDataAggregateArgs> = z.object({
  where: IndeksKamiDataWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiDataOrderByWithRelationInputSchema.array(),IndeksKamiDataOrderByWithRelationInputSchema ]).optional(),
  cursor: IndeksKamiDataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const IndeksKamiDataGroupByArgsSchema: z.ZodType<Prisma.IndeksKamiDataGroupByArgs> = z.object({
  where: IndeksKamiDataWhereInputSchema.optional(),
  orderBy: z.union([ IndeksKamiDataOrderByWithAggregationInputSchema.array(),IndeksKamiDataOrderByWithAggregationInputSchema ]).optional(),
  by: IndeksKamiDataScalarFieldEnumSchema.array(),
  having: IndeksKamiDataScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const IndeksKamiDataFindUniqueArgsSchema: z.ZodType<Prisma.IndeksKamiDataFindUniqueArgs> = z.object({
  select: IndeksKamiDataSelectSchema.optional(),
  include: IndeksKamiDataIncludeSchema.optional(),
  where: IndeksKamiDataWhereUniqueInputSchema,
}).strict()

export const IndeksKamiDataFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.IndeksKamiDataFindUniqueOrThrowArgs> = z.object({
  select: IndeksKamiDataSelectSchema.optional(),
  include: IndeksKamiDataIncludeSchema.optional(),
  where: IndeksKamiDataWhereUniqueInputSchema,
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const RoleCreateArgsSchema: z.ZodType<Prisma.RoleCreateArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  data: z.union([ RoleCreateInputSchema,RoleUncheckedCreateInputSchema ]),
}).strict()

export const RoleUpsertArgsSchema: z.ZodType<Prisma.RoleUpsertArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
  create: z.union([ RoleCreateInputSchema,RoleUncheckedCreateInputSchema ]),
  update: z.union([ RoleUpdateInputSchema,RoleUncheckedUpdateInputSchema ]),
}).strict()

export const RoleCreateManyArgsSchema: z.ZodType<Prisma.RoleCreateManyArgs> = z.object({
  data: z.union([ RoleCreateManyInputSchema,RoleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const RoleDeleteArgsSchema: z.ZodType<Prisma.RoleDeleteArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict()

export const RoleUpdateArgsSchema: z.ZodType<Prisma.RoleUpdateArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  data: z.union([ RoleUpdateInputSchema,RoleUncheckedUpdateInputSchema ]),
  where: RoleWhereUniqueInputSchema,
}).strict()

export const RoleUpdateManyArgsSchema: z.ZodType<Prisma.RoleUpdateManyArgs> = z.object({
  data: z.union([ RoleUpdateManyMutationInputSchema,RoleUncheckedUpdateManyInputSchema ]),
  where: RoleWhereInputSchema.optional(),
}).strict()

export const RoleDeleteManyArgsSchema: z.ZodType<Prisma.RoleDeleteManyArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
}).strict()

export const UnitCreateArgsSchema: z.ZodType<Prisma.UnitCreateArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  data: z.union([ UnitCreateInputSchema,UnitUncheckedCreateInputSchema ]),
}).strict()

export const UnitUpsertArgsSchema: z.ZodType<Prisma.UnitUpsertArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereUniqueInputSchema,
  create: z.union([ UnitCreateInputSchema,UnitUncheckedCreateInputSchema ]),
  update: z.union([ UnitUpdateInputSchema,UnitUncheckedUpdateInputSchema ]),
}).strict()

export const UnitCreateManyArgsSchema: z.ZodType<Prisma.UnitCreateManyArgs> = z.object({
  data: z.union([ UnitCreateManyInputSchema,UnitCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UnitDeleteArgsSchema: z.ZodType<Prisma.UnitDeleteArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  where: UnitWhereUniqueInputSchema,
}).strict()

export const UnitUpdateArgsSchema: z.ZodType<Prisma.UnitUpdateArgs> = z.object({
  select: UnitSelectSchema.optional(),
  include: UnitIncludeSchema.optional(),
  data: z.union([ UnitUpdateInputSchema,UnitUncheckedUpdateInputSchema ]),
  where: UnitWhereUniqueInputSchema,
}).strict()

export const UnitUpdateManyArgsSchema: z.ZodType<Prisma.UnitUpdateManyArgs> = z.object({
  data: z.union([ UnitUpdateManyMutationInputSchema,UnitUncheckedUpdateManyInputSchema ]),
  where: UnitWhereInputSchema.optional(),
}).strict()

export const UnitDeleteManyArgsSchema: z.ZodType<Prisma.UnitDeleteManyArgs> = z.object({
  where: UnitWhereInputSchema.optional(),
}).strict()

export const DevicesCreateArgsSchema: z.ZodType<Prisma.DevicesCreateArgs> = z.object({
  select: DevicesSelectSchema.optional(),
  include: DevicesIncludeSchema.optional(),
  data: z.union([ DevicesCreateInputSchema,DevicesUncheckedCreateInputSchema ]),
}).strict()

export const DevicesUpsertArgsSchema: z.ZodType<Prisma.DevicesUpsertArgs> = z.object({
  select: DevicesSelectSchema.optional(),
  include: DevicesIncludeSchema.optional(),
  where: DevicesWhereUniqueInputSchema,
  create: z.union([ DevicesCreateInputSchema,DevicesUncheckedCreateInputSchema ]),
  update: z.union([ DevicesUpdateInputSchema,DevicesUncheckedUpdateInputSchema ]),
}).strict()

export const DevicesCreateManyArgsSchema: z.ZodType<Prisma.DevicesCreateManyArgs> = z.object({
  data: z.union([ DevicesCreateManyInputSchema,DevicesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const DevicesDeleteArgsSchema: z.ZodType<Prisma.DevicesDeleteArgs> = z.object({
  select: DevicesSelectSchema.optional(),
  include: DevicesIncludeSchema.optional(),
  where: DevicesWhereUniqueInputSchema,
}).strict()

export const DevicesUpdateArgsSchema: z.ZodType<Prisma.DevicesUpdateArgs> = z.object({
  select: DevicesSelectSchema.optional(),
  include: DevicesIncludeSchema.optional(),
  data: z.union([ DevicesUpdateInputSchema,DevicesUncheckedUpdateInputSchema ]),
  where: DevicesWhereUniqueInputSchema,
}).strict()

export const DevicesUpdateManyArgsSchema: z.ZodType<Prisma.DevicesUpdateManyArgs> = z.object({
  data: z.union([ DevicesUpdateManyMutationInputSchema,DevicesUncheckedUpdateManyInputSchema ]),
  where: DevicesWhereInputSchema.optional(),
}).strict()

export const DevicesDeleteManyArgsSchema: z.ZodType<Prisma.DevicesDeleteManyArgs> = z.object({
  where: DevicesWhereInputSchema.optional(),
}).strict()

export const SiteCreateArgsSchema: z.ZodType<Prisma.SiteCreateArgs> = z.object({
  select: SiteSelectSchema.optional(),
  include: SiteIncludeSchema.optional(),
  data: z.union([ SiteCreateInputSchema,SiteUncheckedCreateInputSchema ]),
}).strict()

export const SiteUpsertArgsSchema: z.ZodType<Prisma.SiteUpsertArgs> = z.object({
  select: SiteSelectSchema.optional(),
  include: SiteIncludeSchema.optional(),
  where: SiteWhereUniqueInputSchema,
  create: z.union([ SiteCreateInputSchema,SiteUncheckedCreateInputSchema ]),
  update: z.union([ SiteUpdateInputSchema,SiteUncheckedUpdateInputSchema ]),
}).strict()

export const SiteCreateManyArgsSchema: z.ZodType<Prisma.SiteCreateManyArgs> = z.object({
  data: z.union([ SiteCreateManyInputSchema,SiteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SiteDeleteArgsSchema: z.ZodType<Prisma.SiteDeleteArgs> = z.object({
  select: SiteSelectSchema.optional(),
  include: SiteIncludeSchema.optional(),
  where: SiteWhereUniqueInputSchema,
}).strict()

export const SiteUpdateArgsSchema: z.ZodType<Prisma.SiteUpdateArgs> = z.object({
  select: SiteSelectSchema.optional(),
  include: SiteIncludeSchema.optional(),
  data: z.union([ SiteUpdateInputSchema,SiteUncheckedUpdateInputSchema ]),
  where: SiteWhereUniqueInputSchema,
}).strict()

export const SiteUpdateManyArgsSchema: z.ZodType<Prisma.SiteUpdateManyArgs> = z.object({
  data: z.union([ SiteUpdateManyMutationInputSchema,SiteUncheckedUpdateManyInputSchema ]),
  where: SiteWhereInputSchema.optional(),
}).strict()

export const SiteDeleteManyArgsSchema: z.ZodType<Prisma.SiteDeleteManyArgs> = z.object({
  where: SiteWhereInputSchema.optional(),
}).strict()

export const SiteAuditCreateArgsSchema: z.ZodType<Prisma.SiteAuditCreateArgs> = z.object({
  select: SiteAuditSelectSchema.optional(),
  include: SiteAuditIncludeSchema.optional(),
  data: z.union([ SiteAuditCreateInputSchema,SiteAuditUncheckedCreateInputSchema ]),
}).strict()

export const SiteAuditUpsertArgsSchema: z.ZodType<Prisma.SiteAuditUpsertArgs> = z.object({
  select: SiteAuditSelectSchema.optional(),
  include: SiteAuditIncludeSchema.optional(),
  where: SiteAuditWhereUniqueInputSchema,
  create: z.union([ SiteAuditCreateInputSchema,SiteAuditUncheckedCreateInputSchema ]),
  update: z.union([ SiteAuditUpdateInputSchema,SiteAuditUncheckedUpdateInputSchema ]),
}).strict()

export const SiteAuditCreateManyArgsSchema: z.ZodType<Prisma.SiteAuditCreateManyArgs> = z.object({
  data: z.union([ SiteAuditCreateManyInputSchema,SiteAuditCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SiteAuditDeleteArgsSchema: z.ZodType<Prisma.SiteAuditDeleteArgs> = z.object({
  select: SiteAuditSelectSchema.optional(),
  include: SiteAuditIncludeSchema.optional(),
  where: SiteAuditWhereUniqueInputSchema,
}).strict()

export const SiteAuditUpdateArgsSchema: z.ZodType<Prisma.SiteAuditUpdateArgs> = z.object({
  select: SiteAuditSelectSchema.optional(),
  include: SiteAuditIncludeSchema.optional(),
  data: z.union([ SiteAuditUpdateInputSchema,SiteAuditUncheckedUpdateInputSchema ]),
  where: SiteAuditWhereUniqueInputSchema,
}).strict()

export const SiteAuditUpdateManyArgsSchema: z.ZodType<Prisma.SiteAuditUpdateManyArgs> = z.object({
  data: z.union([ SiteAuditUpdateManyMutationInputSchema,SiteAuditUncheckedUpdateManyInputSchema ]),
  where: SiteAuditWhereInputSchema.optional(),
}).strict()

export const SiteAuditDeleteManyArgsSchema: z.ZodType<Prisma.SiteAuditDeleteManyArgs> = z.object({
  where: SiteAuditWhereInputSchema.optional(),
}).strict()

export const CertificateCreateArgsSchema: z.ZodType<Prisma.CertificateCreateArgs> = z.object({
  select: CertificateSelectSchema.optional(),
  include: CertificateIncludeSchema.optional(),
  data: z.union([ CertificateCreateInputSchema,CertificateUncheckedCreateInputSchema ]),
}).strict()

export const CertificateUpsertArgsSchema: z.ZodType<Prisma.CertificateUpsertArgs> = z.object({
  select: CertificateSelectSchema.optional(),
  include: CertificateIncludeSchema.optional(),
  where: CertificateWhereUniqueInputSchema,
  create: z.union([ CertificateCreateInputSchema,CertificateUncheckedCreateInputSchema ]),
  update: z.union([ CertificateUpdateInputSchema,CertificateUncheckedUpdateInputSchema ]),
}).strict()

export const CertificateCreateManyArgsSchema: z.ZodType<Prisma.CertificateCreateManyArgs> = z.object({
  data: z.union([ CertificateCreateManyInputSchema,CertificateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CertificateDeleteArgsSchema: z.ZodType<Prisma.CertificateDeleteArgs> = z.object({
  select: CertificateSelectSchema.optional(),
  include: CertificateIncludeSchema.optional(),
  where: CertificateWhereUniqueInputSchema,
}).strict()

export const CertificateUpdateArgsSchema: z.ZodType<Prisma.CertificateUpdateArgs> = z.object({
  select: CertificateSelectSchema.optional(),
  include: CertificateIncludeSchema.optional(),
  data: z.union([ CertificateUpdateInputSchema,CertificateUncheckedUpdateInputSchema ]),
  where: CertificateWhereUniqueInputSchema,
}).strict()

export const CertificateUpdateManyArgsSchema: z.ZodType<Prisma.CertificateUpdateManyArgs> = z.object({
  data: z.union([ CertificateUpdateManyMutationInputSchema,CertificateUncheckedUpdateManyInputSchema ]),
  where: CertificateWhereInputSchema.optional(),
}).strict()

export const CertificateDeleteManyArgsSchema: z.ZodType<Prisma.CertificateDeleteManyArgs> = z.object({
  where: CertificateWhereInputSchema.optional(),
}).strict()

export const FortigateCreateArgsSchema: z.ZodType<Prisma.FortigateCreateArgs> = z.object({
  select: FortigateSelectSchema.optional(),
  data: z.union([ FortigateCreateInputSchema,FortigateUncheckedCreateInputSchema ]),
}).strict()

export const FortigateUpsertArgsSchema: z.ZodType<Prisma.FortigateUpsertArgs> = z.object({
  select: FortigateSelectSchema.optional(),
  where: FortigateWhereUniqueInputSchema,
  create: z.union([ FortigateCreateInputSchema,FortigateUncheckedCreateInputSchema ]),
  update: z.union([ FortigateUpdateInputSchema,FortigateUncheckedUpdateInputSchema ]),
}).strict()

export const FortigateCreateManyArgsSchema: z.ZodType<Prisma.FortigateCreateManyArgs> = z.object({
  data: z.union([ FortigateCreateManyInputSchema,FortigateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const FortigateDeleteArgsSchema: z.ZodType<Prisma.FortigateDeleteArgs> = z.object({
  select: FortigateSelectSchema.optional(),
  where: FortigateWhereUniqueInputSchema,
}).strict()

export const FortigateUpdateArgsSchema: z.ZodType<Prisma.FortigateUpdateArgs> = z.object({
  select: FortigateSelectSchema.optional(),
  data: z.union([ FortigateUpdateInputSchema,FortigateUncheckedUpdateInputSchema ]),
  where: FortigateWhereUniqueInputSchema,
}).strict()

export const FortigateUpdateManyArgsSchema: z.ZodType<Prisma.FortigateUpdateManyArgs> = z.object({
  data: z.union([ FortigateUpdateManyMutationInputSchema,FortigateUncheckedUpdateManyInputSchema ]),
  where: FortigateWhereInputSchema.optional(),
}).strict()

export const FortigateDeleteManyArgsSchema: z.ZodType<Prisma.FortigateDeleteManyArgs> = z.object({
  where: FortigateWhereInputSchema.optional(),
}).strict()

export const CsirtPostCreateArgsSchema: z.ZodType<Prisma.CsirtPostCreateArgs> = z.object({
  select: CsirtPostSelectSchema.optional(),
  include: CsirtPostIncludeSchema.optional(),
  data: z.union([ CsirtPostCreateInputSchema,CsirtPostUncheckedCreateInputSchema ]),
}).strict()

export const CsirtPostUpsertArgsSchema: z.ZodType<Prisma.CsirtPostUpsertArgs> = z.object({
  select: CsirtPostSelectSchema.optional(),
  include: CsirtPostIncludeSchema.optional(),
  where: CsirtPostWhereUniqueInputSchema,
  create: z.union([ CsirtPostCreateInputSchema,CsirtPostUncheckedCreateInputSchema ]),
  update: z.union([ CsirtPostUpdateInputSchema,CsirtPostUncheckedUpdateInputSchema ]),
}).strict()

export const CsirtPostCreateManyArgsSchema: z.ZodType<Prisma.CsirtPostCreateManyArgs> = z.object({
  data: z.union([ CsirtPostCreateManyInputSchema,CsirtPostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CsirtPostDeleteArgsSchema: z.ZodType<Prisma.CsirtPostDeleteArgs> = z.object({
  select: CsirtPostSelectSchema.optional(),
  include: CsirtPostIncludeSchema.optional(),
  where: CsirtPostWhereUniqueInputSchema,
}).strict()

export const CsirtPostUpdateArgsSchema: z.ZodType<Prisma.CsirtPostUpdateArgs> = z.object({
  select: CsirtPostSelectSchema.optional(),
  include: CsirtPostIncludeSchema.optional(),
  data: z.union([ CsirtPostUpdateInputSchema,CsirtPostUncheckedUpdateInputSchema ]),
  where: CsirtPostWhereUniqueInputSchema,
}).strict()

export const CsirtPostUpdateManyArgsSchema: z.ZodType<Prisma.CsirtPostUpdateManyArgs> = z.object({
  data: z.union([ CsirtPostUpdateManyMutationInputSchema,CsirtPostUncheckedUpdateManyInputSchema ]),
  where: CsirtPostWhereInputSchema.optional(),
}).strict()

export const CsirtPostDeleteManyArgsSchema: z.ZodType<Prisma.CsirtPostDeleteManyArgs> = z.object({
  where: CsirtPostWhereInputSchema.optional(),
}).strict()

export const CsirtCategoryCreateArgsSchema: z.ZodType<Prisma.CsirtCategoryCreateArgs> = z.object({
  select: CsirtCategorySelectSchema.optional(),
  include: CsirtCategoryIncludeSchema.optional(),
  data: z.union([ CsirtCategoryCreateInputSchema,CsirtCategoryUncheckedCreateInputSchema ]),
}).strict()

export const CsirtCategoryUpsertArgsSchema: z.ZodType<Prisma.CsirtCategoryUpsertArgs> = z.object({
  select: CsirtCategorySelectSchema.optional(),
  include: CsirtCategoryIncludeSchema.optional(),
  where: CsirtCategoryWhereUniqueInputSchema,
  create: z.union([ CsirtCategoryCreateInputSchema,CsirtCategoryUncheckedCreateInputSchema ]),
  update: z.union([ CsirtCategoryUpdateInputSchema,CsirtCategoryUncheckedUpdateInputSchema ]),
}).strict()

export const CsirtCategoryCreateManyArgsSchema: z.ZodType<Prisma.CsirtCategoryCreateManyArgs> = z.object({
  data: z.union([ CsirtCategoryCreateManyInputSchema,CsirtCategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CsirtCategoryDeleteArgsSchema: z.ZodType<Prisma.CsirtCategoryDeleteArgs> = z.object({
  select: CsirtCategorySelectSchema.optional(),
  include: CsirtCategoryIncludeSchema.optional(),
  where: CsirtCategoryWhereUniqueInputSchema,
}).strict()

export const CsirtCategoryUpdateArgsSchema: z.ZodType<Prisma.CsirtCategoryUpdateArgs> = z.object({
  select: CsirtCategorySelectSchema.optional(),
  include: CsirtCategoryIncludeSchema.optional(),
  data: z.union([ CsirtCategoryUpdateInputSchema,CsirtCategoryUncheckedUpdateInputSchema ]),
  where: CsirtCategoryWhereUniqueInputSchema,
}).strict()

export const CsirtCategoryUpdateManyArgsSchema: z.ZodType<Prisma.CsirtCategoryUpdateManyArgs> = z.object({
  data: z.union([ CsirtCategoryUpdateManyMutationInputSchema,CsirtCategoryUncheckedUpdateManyInputSchema ]),
  where: CsirtCategoryWhereInputSchema.optional(),
}).strict()

export const CsirtCategoryDeleteManyArgsSchema: z.ZodType<Prisma.CsirtCategoryDeleteManyArgs> = z.object({
  where: CsirtCategoryWhereInputSchema.optional(),
}).strict()

export const HelpdeskCreateArgsSchema: z.ZodType<Prisma.HelpdeskCreateArgs> = z.object({
  select: HelpdeskSelectSchema.optional(),
  include: HelpdeskIncludeSchema.optional(),
  data: z.union([ HelpdeskCreateInputSchema,HelpdeskUncheckedCreateInputSchema ]),
}).strict()

export const HelpdeskUpsertArgsSchema: z.ZodType<Prisma.HelpdeskUpsertArgs> = z.object({
  select: HelpdeskSelectSchema.optional(),
  include: HelpdeskIncludeSchema.optional(),
  where: HelpdeskWhereUniqueInputSchema,
  create: z.union([ HelpdeskCreateInputSchema,HelpdeskUncheckedCreateInputSchema ]),
  update: z.union([ HelpdeskUpdateInputSchema,HelpdeskUncheckedUpdateInputSchema ]),
}).strict()

export const HelpdeskCreateManyArgsSchema: z.ZodType<Prisma.HelpdeskCreateManyArgs> = z.object({
  data: z.union([ HelpdeskCreateManyInputSchema,HelpdeskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const HelpdeskDeleteArgsSchema: z.ZodType<Prisma.HelpdeskDeleteArgs> = z.object({
  select: HelpdeskSelectSchema.optional(),
  include: HelpdeskIncludeSchema.optional(),
  where: HelpdeskWhereUniqueInputSchema,
}).strict()

export const HelpdeskUpdateArgsSchema: z.ZodType<Prisma.HelpdeskUpdateArgs> = z.object({
  select: HelpdeskSelectSchema.optional(),
  include: HelpdeskIncludeSchema.optional(),
  data: z.union([ HelpdeskUpdateInputSchema,HelpdeskUncheckedUpdateInputSchema ]),
  where: HelpdeskWhereUniqueInputSchema,
}).strict()

export const HelpdeskUpdateManyArgsSchema: z.ZodType<Prisma.HelpdeskUpdateManyArgs> = z.object({
  data: z.union([ HelpdeskUpdateManyMutationInputSchema,HelpdeskUncheckedUpdateManyInputSchema ]),
  where: HelpdeskWhereInputSchema.optional(),
}).strict()

export const HelpdeskDeleteManyArgsSchema: z.ZodType<Prisma.HelpdeskDeleteManyArgs> = z.object({
  where: HelpdeskWhereInputSchema.optional(),
}).strict()

export const HelpdeskCategoryCreateArgsSchema: z.ZodType<Prisma.HelpdeskCategoryCreateArgs> = z.object({
  select: HelpdeskCategorySelectSchema.optional(),
  include: HelpdeskCategoryIncludeSchema.optional(),
  data: z.union([ HelpdeskCategoryCreateInputSchema,HelpdeskCategoryUncheckedCreateInputSchema ]),
}).strict()

export const HelpdeskCategoryUpsertArgsSchema: z.ZodType<Prisma.HelpdeskCategoryUpsertArgs> = z.object({
  select: HelpdeskCategorySelectSchema.optional(),
  include: HelpdeskCategoryIncludeSchema.optional(),
  where: HelpdeskCategoryWhereUniqueInputSchema,
  create: z.union([ HelpdeskCategoryCreateInputSchema,HelpdeskCategoryUncheckedCreateInputSchema ]),
  update: z.union([ HelpdeskCategoryUpdateInputSchema,HelpdeskCategoryUncheckedUpdateInputSchema ]),
}).strict()

export const HelpdeskCategoryCreateManyArgsSchema: z.ZodType<Prisma.HelpdeskCategoryCreateManyArgs> = z.object({
  data: z.union([ HelpdeskCategoryCreateManyInputSchema,HelpdeskCategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const HelpdeskCategoryDeleteArgsSchema: z.ZodType<Prisma.HelpdeskCategoryDeleteArgs> = z.object({
  select: HelpdeskCategorySelectSchema.optional(),
  include: HelpdeskCategoryIncludeSchema.optional(),
  where: HelpdeskCategoryWhereUniqueInputSchema,
}).strict()

export const HelpdeskCategoryUpdateArgsSchema: z.ZodType<Prisma.HelpdeskCategoryUpdateArgs> = z.object({
  select: HelpdeskCategorySelectSchema.optional(),
  include: HelpdeskCategoryIncludeSchema.optional(),
  data: z.union([ HelpdeskCategoryUpdateInputSchema,HelpdeskCategoryUncheckedUpdateInputSchema ]),
  where: HelpdeskCategoryWhereUniqueInputSchema,
}).strict()

export const HelpdeskCategoryUpdateManyArgsSchema: z.ZodType<Prisma.HelpdeskCategoryUpdateManyArgs> = z.object({
  data: z.union([ HelpdeskCategoryUpdateManyMutationInputSchema,HelpdeskCategoryUncheckedUpdateManyInputSchema ]),
  where: HelpdeskCategoryWhereInputSchema.optional(),
}).strict()

export const HelpdeskCategoryDeleteManyArgsSchema: z.ZodType<Prisma.HelpdeskCategoryDeleteManyArgs> = z.object({
  where: HelpdeskCategoryWhereInputSchema.optional(),
}).strict()

export const IndeksKamiCreateArgsSchema: z.ZodType<Prisma.IndeksKamiCreateArgs> = z.object({
  select: IndeksKamiSelectSchema.optional(),
  include: IndeksKamiIncludeSchema.optional(),
  data: z.union([ IndeksKamiCreateInputSchema,IndeksKamiUncheckedCreateInputSchema ]),
}).strict()

export const IndeksKamiUpsertArgsSchema: z.ZodType<Prisma.IndeksKamiUpsertArgs> = z.object({
  select: IndeksKamiSelectSchema.optional(),
  include: IndeksKamiIncludeSchema.optional(),
  where: IndeksKamiWhereUniqueInputSchema,
  create: z.union([ IndeksKamiCreateInputSchema,IndeksKamiUncheckedCreateInputSchema ]),
  update: z.union([ IndeksKamiUpdateInputSchema,IndeksKamiUncheckedUpdateInputSchema ]),
}).strict()

export const IndeksKamiCreateManyArgsSchema: z.ZodType<Prisma.IndeksKamiCreateManyArgs> = z.object({
  data: z.union([ IndeksKamiCreateManyInputSchema,IndeksKamiCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const IndeksKamiDeleteArgsSchema: z.ZodType<Prisma.IndeksKamiDeleteArgs> = z.object({
  select: IndeksKamiSelectSchema.optional(),
  include: IndeksKamiIncludeSchema.optional(),
  where: IndeksKamiWhereUniqueInputSchema,
}).strict()

export const IndeksKamiUpdateArgsSchema: z.ZodType<Prisma.IndeksKamiUpdateArgs> = z.object({
  select: IndeksKamiSelectSchema.optional(),
  include: IndeksKamiIncludeSchema.optional(),
  data: z.union([ IndeksKamiUpdateInputSchema,IndeksKamiUncheckedUpdateInputSchema ]),
  where: IndeksKamiWhereUniqueInputSchema,
}).strict()

export const IndeksKamiUpdateManyArgsSchema: z.ZodType<Prisma.IndeksKamiUpdateManyArgs> = z.object({
  data: z.union([ IndeksKamiUpdateManyMutationInputSchema,IndeksKamiUncheckedUpdateManyInputSchema ]),
  where: IndeksKamiWhereInputSchema.optional(),
}).strict()

export const IndeksKamiDeleteManyArgsSchema: z.ZodType<Prisma.IndeksKamiDeleteManyArgs> = z.object({
  where: IndeksKamiWhereInputSchema.optional(),
}).strict()

export const IndeksKamiCategoryCreateArgsSchema: z.ZodType<Prisma.IndeksKamiCategoryCreateArgs> = z.object({
  select: IndeksKamiCategorySelectSchema.optional(),
  include: IndeksKamiCategoryIncludeSchema.optional(),
  data: z.union([ IndeksKamiCategoryCreateInputSchema,IndeksKamiCategoryUncheckedCreateInputSchema ]),
}).strict()

export const IndeksKamiCategoryUpsertArgsSchema: z.ZodType<Prisma.IndeksKamiCategoryUpsertArgs> = z.object({
  select: IndeksKamiCategorySelectSchema.optional(),
  include: IndeksKamiCategoryIncludeSchema.optional(),
  where: IndeksKamiCategoryWhereUniqueInputSchema,
  create: z.union([ IndeksKamiCategoryCreateInputSchema,IndeksKamiCategoryUncheckedCreateInputSchema ]),
  update: z.union([ IndeksKamiCategoryUpdateInputSchema,IndeksKamiCategoryUncheckedUpdateInputSchema ]),
}).strict()

export const IndeksKamiCategoryCreateManyArgsSchema: z.ZodType<Prisma.IndeksKamiCategoryCreateManyArgs> = z.object({
  data: z.union([ IndeksKamiCategoryCreateManyInputSchema,IndeksKamiCategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const IndeksKamiCategoryDeleteArgsSchema: z.ZodType<Prisma.IndeksKamiCategoryDeleteArgs> = z.object({
  select: IndeksKamiCategorySelectSchema.optional(),
  include: IndeksKamiCategoryIncludeSchema.optional(),
  where: IndeksKamiCategoryWhereUniqueInputSchema,
}).strict()

export const IndeksKamiCategoryUpdateArgsSchema: z.ZodType<Prisma.IndeksKamiCategoryUpdateArgs> = z.object({
  select: IndeksKamiCategorySelectSchema.optional(),
  include: IndeksKamiCategoryIncludeSchema.optional(),
  data: z.union([ IndeksKamiCategoryUpdateInputSchema,IndeksKamiCategoryUncheckedUpdateInputSchema ]),
  where: IndeksKamiCategoryWhereUniqueInputSchema,
}).strict()

export const IndeksKamiCategoryUpdateManyArgsSchema: z.ZodType<Prisma.IndeksKamiCategoryUpdateManyArgs> = z.object({
  data: z.union([ IndeksKamiCategoryUpdateManyMutationInputSchema,IndeksKamiCategoryUncheckedUpdateManyInputSchema ]),
  where: IndeksKamiCategoryWhereInputSchema.optional(),
}).strict()

export const IndeksKamiCategoryDeleteManyArgsSchema: z.ZodType<Prisma.IndeksKamiCategoryDeleteManyArgs> = z.object({
  where: IndeksKamiCategoryWhereInputSchema.optional(),
}).strict()

export const IndeksKamiCriteriaCreateArgsSchema: z.ZodType<Prisma.IndeksKamiCriteriaCreateArgs> = z.object({
  select: IndeksKamiCriteriaSelectSchema.optional(),
  data: z.union([ IndeksKamiCriteriaCreateInputSchema,IndeksKamiCriteriaUncheckedCreateInputSchema ]),
}).strict()

export const IndeksKamiCriteriaUpsertArgsSchema: z.ZodType<Prisma.IndeksKamiCriteriaUpsertArgs> = z.object({
  select: IndeksKamiCriteriaSelectSchema.optional(),
  where: IndeksKamiCriteriaWhereUniqueInputSchema,
  create: z.union([ IndeksKamiCriteriaCreateInputSchema,IndeksKamiCriteriaUncheckedCreateInputSchema ]),
  update: z.union([ IndeksKamiCriteriaUpdateInputSchema,IndeksKamiCriteriaUncheckedUpdateInputSchema ]),
}).strict()

export const IndeksKamiCriteriaCreateManyArgsSchema: z.ZodType<Prisma.IndeksKamiCriteriaCreateManyArgs> = z.object({
  data: z.union([ IndeksKamiCriteriaCreateManyInputSchema,IndeksKamiCriteriaCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const IndeksKamiCriteriaDeleteArgsSchema: z.ZodType<Prisma.IndeksKamiCriteriaDeleteArgs> = z.object({
  select: IndeksKamiCriteriaSelectSchema.optional(),
  where: IndeksKamiCriteriaWhereUniqueInputSchema,
}).strict()

export const IndeksKamiCriteriaUpdateArgsSchema: z.ZodType<Prisma.IndeksKamiCriteriaUpdateArgs> = z.object({
  select: IndeksKamiCriteriaSelectSchema.optional(),
  data: z.union([ IndeksKamiCriteriaUpdateInputSchema,IndeksKamiCriteriaUncheckedUpdateInputSchema ]),
  where: IndeksKamiCriteriaWhereUniqueInputSchema,
}).strict()

export const IndeksKamiCriteriaUpdateManyArgsSchema: z.ZodType<Prisma.IndeksKamiCriteriaUpdateManyArgs> = z.object({
  data: z.union([ IndeksKamiCriteriaUpdateManyMutationInputSchema,IndeksKamiCriteriaUncheckedUpdateManyInputSchema ]),
  where: IndeksKamiCriteriaWhereInputSchema.optional(),
}).strict()

export const IndeksKamiCriteriaDeleteManyArgsSchema: z.ZodType<Prisma.IndeksKamiCriteriaDeleteManyArgs> = z.object({
  where: IndeksKamiCriteriaWhereInputSchema.optional(),
}).strict()

export const IndeksKamiTemplateCreateArgsSchema: z.ZodType<Prisma.IndeksKamiTemplateCreateArgs> = z.object({
  select: IndeksKamiTemplateSelectSchema.optional(),
  include: IndeksKamiTemplateIncludeSchema.optional(),
  data: z.union([ IndeksKamiTemplateCreateInputSchema,IndeksKamiTemplateUncheckedCreateInputSchema ]),
}).strict()

export const IndeksKamiTemplateUpsertArgsSchema: z.ZodType<Prisma.IndeksKamiTemplateUpsertArgs> = z.object({
  select: IndeksKamiTemplateSelectSchema.optional(),
  include: IndeksKamiTemplateIncludeSchema.optional(),
  where: IndeksKamiTemplateWhereUniqueInputSchema,
  create: z.union([ IndeksKamiTemplateCreateInputSchema,IndeksKamiTemplateUncheckedCreateInputSchema ]),
  update: z.union([ IndeksKamiTemplateUpdateInputSchema,IndeksKamiTemplateUncheckedUpdateInputSchema ]),
}).strict()

export const IndeksKamiTemplateCreateManyArgsSchema: z.ZodType<Prisma.IndeksKamiTemplateCreateManyArgs> = z.object({
  data: z.union([ IndeksKamiTemplateCreateManyInputSchema,IndeksKamiTemplateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const IndeksKamiTemplateDeleteArgsSchema: z.ZodType<Prisma.IndeksKamiTemplateDeleteArgs> = z.object({
  select: IndeksKamiTemplateSelectSchema.optional(),
  include: IndeksKamiTemplateIncludeSchema.optional(),
  where: IndeksKamiTemplateWhereUniqueInputSchema,
}).strict()

export const IndeksKamiTemplateUpdateArgsSchema: z.ZodType<Prisma.IndeksKamiTemplateUpdateArgs> = z.object({
  select: IndeksKamiTemplateSelectSchema.optional(),
  include: IndeksKamiTemplateIncludeSchema.optional(),
  data: z.union([ IndeksKamiTemplateUpdateInputSchema,IndeksKamiTemplateUncheckedUpdateInputSchema ]),
  where: IndeksKamiTemplateWhereUniqueInputSchema,
}).strict()

export const IndeksKamiTemplateUpdateManyArgsSchema: z.ZodType<Prisma.IndeksKamiTemplateUpdateManyArgs> = z.object({
  data: z.union([ IndeksKamiTemplateUpdateManyMutationInputSchema,IndeksKamiTemplateUncheckedUpdateManyInputSchema ]),
  where: IndeksKamiTemplateWhereInputSchema.optional(),
}).strict()

export const IndeksKamiTemplateDeleteManyArgsSchema: z.ZodType<Prisma.IndeksKamiTemplateDeleteManyArgs> = z.object({
  where: IndeksKamiTemplateWhereInputSchema.optional(),
}).strict()

export const IndeksKamiDataCreateArgsSchema: z.ZodType<Prisma.IndeksKamiDataCreateArgs> = z.object({
  select: IndeksKamiDataSelectSchema.optional(),
  include: IndeksKamiDataIncludeSchema.optional(),
  data: z.union([ IndeksKamiDataCreateInputSchema,IndeksKamiDataUncheckedCreateInputSchema ]),
}).strict()

export const IndeksKamiDataUpsertArgsSchema: z.ZodType<Prisma.IndeksKamiDataUpsertArgs> = z.object({
  select: IndeksKamiDataSelectSchema.optional(),
  include: IndeksKamiDataIncludeSchema.optional(),
  where: IndeksKamiDataWhereUniqueInputSchema,
  create: z.union([ IndeksKamiDataCreateInputSchema,IndeksKamiDataUncheckedCreateInputSchema ]),
  update: z.union([ IndeksKamiDataUpdateInputSchema,IndeksKamiDataUncheckedUpdateInputSchema ]),
}).strict()

export const IndeksKamiDataCreateManyArgsSchema: z.ZodType<Prisma.IndeksKamiDataCreateManyArgs> = z.object({
  data: z.union([ IndeksKamiDataCreateManyInputSchema,IndeksKamiDataCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const IndeksKamiDataDeleteArgsSchema: z.ZodType<Prisma.IndeksKamiDataDeleteArgs> = z.object({
  select: IndeksKamiDataSelectSchema.optional(),
  include: IndeksKamiDataIncludeSchema.optional(),
  where: IndeksKamiDataWhereUniqueInputSchema,
}).strict()

export const IndeksKamiDataUpdateArgsSchema: z.ZodType<Prisma.IndeksKamiDataUpdateArgs> = z.object({
  select: IndeksKamiDataSelectSchema.optional(),
  include: IndeksKamiDataIncludeSchema.optional(),
  data: z.union([ IndeksKamiDataUpdateInputSchema,IndeksKamiDataUncheckedUpdateInputSchema ]),
  where: IndeksKamiDataWhereUniqueInputSchema,
}).strict()

export const IndeksKamiDataUpdateManyArgsSchema: z.ZodType<Prisma.IndeksKamiDataUpdateManyArgs> = z.object({
  data: z.union([ IndeksKamiDataUpdateManyMutationInputSchema,IndeksKamiDataUncheckedUpdateManyInputSchema ]),
  where: IndeksKamiDataWhereInputSchema.optional(),
}).strict()

export const IndeksKamiDataDeleteManyArgsSchema: z.ZodType<Prisma.IndeksKamiDataDeleteManyArgs> = z.object({
  where: IndeksKamiDataWhereInputSchema.optional(),
}).strict()