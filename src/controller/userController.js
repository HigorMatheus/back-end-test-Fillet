const DB = require('../database/dbConnect')
const bcrypt = require('bcryptjs')

const UserController = {
    async create(req, res){
        // return res.json({ data: req.body })
        try {
            const {
               first_name,
                last_name,
                telephone,
                email,
                password,
                confirm_password
            } = req.body
    
            if (password != confirm_password) {
                return  res.json({mensagem: 'as senhas nao batem'});
            }
        
            bcrypt.genSalt(10,(error,salt)=>{
                bcrypt.hash(password,salt, async (error,hash)=>{
                    if(error){
                        req.json('erro ao salvar usuario')
                    }
                    const user = await DB.table('users').insert({
                        first_name,
                        last_name,
                        telephone,
                        email,
                        password: hash
                    })
                    const data = {
                        id:user[0],
                        first_name,
                        last_name,
                        telephone,
                    }
                    return res.status(201).json( data )
                })
            })
            
        } catch (error) {
            return res.status(400).json({ error })
        }
    },

    
   
}
module.exports = UserController