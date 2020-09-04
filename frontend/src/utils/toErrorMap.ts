import { FiledError } from "../generated/graphql";

export const toErrorMap = (errors: FiledError[] )=> {
    const errorMap: Record<string, string> = {}
    errors.forEach(({field, message})=> {
        errorMap[field] = message
    });
    return errorMap
}