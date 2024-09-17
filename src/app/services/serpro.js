const { default: axios } = require("axios")

const baseUrl = process.env.SERPRO_BASE_URL
const trialPath = process.env.SERPRO_TRIAL_PATH
let token = process.env.SERPRO_TRIAL_TOKEN
const consumerKey = process.env.SERPRO_CONSUMER_KEY || 'SERPRO_CONSUMER_KEY'
const consumerSecret = process.env.SERPRO_CONSUMER_SECRET || 'SERPRO_CONSUMER_SECRET'

let config = {
  headers: { Authorization: `Bearer ${token}` }
};

const getToken = () => {
  return axios.post(`${baseUrl}/token`, {
    grant_type: 'client_credentials'
  }, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
}

const checkCpf = async (cpf) => {
  return axios.get(`${baseUrl}/${trialPath}/cpf/${cpf}`, config)
}


const checkStatus = async () => {
  return axios.get(`${baseUrl}/${trialPath}/status`, config)
}

const getCpfData = async (cpf) => {
  try {

    const tokenResponse = await getToken()
    token = tokenResponse?.data?.access_token

    const { data } = await checkCpf(cpf)

    return { cpfData: data }


  } catch (error) {

    const tokenErrorMessage = error?.response?.data?.error_description
    const cpfErrorMessage = error?.response?.data?.mensagem

    console.error({
      msg: error?.message,
      status: error?.response?.status,
      tokenErrorMessage,
      cpfErrorMessage
    })

    return { error: `Falha ao obter dados do cpf ${cpf}` }
  }
}

export { getCpfData }

