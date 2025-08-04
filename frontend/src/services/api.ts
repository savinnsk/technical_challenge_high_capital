import axios from 'axios';

export const authorization = async (formData: {
    password: string,
    email: string
}) => {
    try {
        const response = await axios.post('http://localhost:5201/api/v1/Authorization', formData, {
               headers: {
                'Content-Type': 'application/json'
                }
        })

        console.log(response)
        if(response.data.acessToken){
            return response.data.acessToken
        }

        return new Error("erro na autorização")

    } catch (error: any) {
        return error
    }
}

export const validadeToken = async (token: string) => {
    try {
        const response = await axios.get('http://localhost:5201/api/v1/Authorization/me', {
               headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
        })

        if(response.data.authenticated){
            return response.data.authenticated
        }

        return new Error("erro na autorização")

    } catch (error: any) {
        return error
    }
}


export const createUser = async (formData: {
    password: string,
    email: string,
    neme : string
}) => {
    try {
        const response = await axios.post('http://localhost:5201/api/v1/Users', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
        })


        return response

    } catch (error: any) {
        return error
    }
}

export const getChatboots = async (token: string) => {
    try {
        const response = await axios.get(`http://localhost:5201/api/v1/Chatbots`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        return response.data

    } catch (error: any) {
         console.log(error)
        return error
    }
}

export const getOneChatboots = async (data : {id : string , token: string}) => {
    try {
        const response = await axios.get(`http://localhost:5201/api/v1/Chatbots/${data.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`
            }
        })



        return response

    } catch (error: any) {

        return error
    }
}

export const deleteOneChatboots = async (data : {id : string , token: string}) => {
    try {
        const response = await axios.delete(`http://localhost:5201/api/v1/Chatbots/${data.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${data.token}`
            }
        })



        return response

    } catch (error: any) {

        return error
    }
}

export const createChatboots = async (token: string, formData : {name: string,
  context: string
 }) => {
    try {
        const response = await axios.post(`http://localhost:5201/api/v1/Chatbots`,formData, {
            headers: {
                'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
            }
        })



        return response

    } catch (error: any) {

        return error
    }
}

export const createMessage = async (token: string, formData : {chatBotId: string,
  content: string
 }) => {
    try {
        const response = await axios.post(`http://localhost:5201/api/v1/Messages`,formData, {
            headers: {
                'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
            }
        })



        return response

    } catch (error: any) {

        return error
    }
}

export const getAllMessagesFromBot = async (token: string, chatBotId: string) => {
    try {
        const response = await axios.get(`http://localhost:5201/api/v1/Messages/${chatBotId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        return response.data

    } catch (error: any) {
        console.log(error)
        return error
    }
}