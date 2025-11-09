import z from 'zod';
export declare const MessageSchema: z.ZodObject<{
    roomId: z.ZodString;
    content: z.ZodString;
    type: z.ZodOptional<z.ZodEnum<{
        text: "text";
        file: "file";
        image: "image";
        video: "video";
    }>>;
}, z.z.core.$strip>;
//# sourceMappingURL=message.validation.d.ts.map