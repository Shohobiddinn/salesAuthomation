export function Variable(){
    let isActive = ref(null)
    return{
        isActive,
    }
}
export const variableData = Variable()
