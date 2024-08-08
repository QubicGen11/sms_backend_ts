import jsonwebtoken from 'jsonwebtoken'
const decodeJwt=(jwtToken:any)=>{
    try {
        const decodeJwtToken= jsonwebtoken.decode(jwtToken)
        return decodeJwtToken
    } catch (error:any) {
        console.log('cant decode jsonwebtoken')
        return error.message
    }
}

export default decodeJwt