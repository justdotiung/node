let users = [
    { id: 1, name: 'Alice'},
    { id: 2, name: 'Blice'},
    { id: 3, name: 'Clice'}
]

const index = (req, res) => {
    req.query.limit = req.query.limit || 10
    const limit = parseInt(req.query.limit,10)
    if(Number.isNaN(limit)){
       return res.status(400).end()
       
    }//else
    res.json(users.slice(0, limit))
}
const show = (req, res) => {
    const id = parseInt(req.params.id, 10)
    // for(let i = 0; i < users.length ; i++ )
    //     if(users[i].id == id){
    //         return res.json(users[i])
    // }
    if(Number.isNaN(id))
        return res.status(400).end()

    const user = users.filter( user => user.id === id)[0]
    if(typeof user  === 'undefined')
        return res.status(404).end()
    res.json(user)
}

const destroy = (req,res) => {
    const id = parseInt(req.params.id,10)

    if(Number.isNaN(id))
        return res.status(400).end()

    users = users.filter(user => user.id !== id)
    res.status(204).end()
    // for(let i = 0; i < users.length; i++){
    //     if(users[i].id == id){
    //         users.pop(i)
    //         console.log(users);
    //         return res.status(204).end()
    //     }
    // }
}

const create = (req,res) => {
    const name = req.body.name
    const id = Date.now()
    const user = {id , name}
    const depl = users.filter(user => user.name === name)[0]
    
    if(typeof name !== 'string'){
        console.log(typeof name)
        return res.status(400).end()
    }
    
    if(depl)
    return res.status(409).end()
    
    
    users.push(user)
    res.status(201).json(user)
}

module.exports = {
    index,
    show,
    destroy,
    create
}
