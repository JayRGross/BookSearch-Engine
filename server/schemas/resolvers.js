const { AuthenticationError } = require('apollo-server-core')
const { User } = require('../models')

const { signToken } = require('../utils/auth') 

const resolvers = {
    Query: {
        me: async (parent, {_id}) => {
            return await User.findById({_id})
        }
    },

    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = User.create({username, email, password})
            const token = signToken(user)
            
            return { token, user }
        },
        login: async (parents, {email, password}) => {
            const user = await User.findOne({ email })

            if(!user){ 
                throw new AuthenticationError('No profile with this email found!')
            } else {
                
                const passwordInput = await user.isCorrectPassword(password)
                if (!passwordInput){
                    throw new AuthenticationError('Incorrect Password!')
                } else {
                    const token = signToken(user)
                    return {token, user}
                }
            }
        },
        saveBook: async (parents, {_id, book}) => {
            const updatedUser = User.findByIdAndUpdate(_id,
                {
                    $push: {
                        savedBooks: book
                    }
                })
                return updatedUser
        },
        removeBook: async (parent, { _id, bookId }) => {
            const updatedUser = await User.findByIdAndUpdate(
                _id,
                { $pull: { savedBooks: { _id: bookId } } }
            )
            return updatedUser
        }
    }
}

module.exports = resolvers