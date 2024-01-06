

export function ClientsPayment(){
    const data = ref([])
    let clientId = ref('')
    let isActive = ref(null)
    let isActive1 = ref(false)
    return{
        data,
        clientId,
        isActive,
        isActive1
    }
}
export const clientsPayment = ClientsPayment()
