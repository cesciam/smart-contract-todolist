const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', (accounts) => {
  before(async () => {
    this.todoList = await TodoList.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.todoList.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('lists tasks', async ()=> {
    // This test doesn't care if in the blockchain there is
    // more than 1 contract, It will only take the  basic archive 
    // and execute it
    const taskCount = await this.todoList.taskCount()
    console.log(taskCount)
    const task = await this.todoList.tasks(taskCount)
    assert.equal(task.id.toNumber(), taskCount.toNumber())
    assert.equal(task.content, 'My first smart contract')
    assert.equal(task.completed, false)
    assert.equal(task.id.toNumber(), 1)
  })
})