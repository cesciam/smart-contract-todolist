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

  it('creates tasks', async () => {
    let content = 'A new task'
    const result = await this.todoList.createTask(content)
    const taskCount = await this.todoList.taskCount()
    assert.equal(taskCount, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.content, content)
    assert.equal(event.completed, false)
  })

  // My test
  it('toggles task completion my test', async()=>{
    let id = 1;
    const task = await this.todoList.tasks(id);
    const result = await this.todoList.toggleCompleted(id);
    const event = result.logs[0].args
    assert.equal(task.completed, !event.completed)
    assert.equal(event.id, id)
  })
})