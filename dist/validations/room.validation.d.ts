import z from 'zod';
export declare const RoomSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    isGroup: z.ZodOptional<z.ZodBoolean>;
    members: z.ZodArray<z.ZodString>;
}, z.z.core.$strip>;
//# sourceMappingURL=room.validation.d.ts.map