import { mutation } from "./_generated/server"

export const CreateWorkspace=mutation({
    args:{
        messages:v.any(),
        user: v.id('users')
    },
    handler:async(ctx,args)=>{
        const workspaceId=await ctx.db.insert('workspace',{
            message:args.messages,
            user:args.user
        });
        return workspaceId;
    }
    
})