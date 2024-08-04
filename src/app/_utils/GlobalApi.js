import axios from "axios";

const SendEmail = async (data) => await axios.post('/api/send', data);

export default SendEmail;