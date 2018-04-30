var EthKan = artifacts.require("./EthKan.sol");

contract('EthKan', function(accounts) {

  it("should create the first project", async () => {
    let instance = await EthKan.deployed();
    let result = await instance.createProject("abc", {from: accounts[0]});
    const projectId = result.logs[0].args._projectId.c[0];
    assert.equal(projectId, 1, "wrong first project");
  })

  it("should create the first card", async () => {
    let instance = await EthKan.deployed();
    let result = await instance.createCard("abc", {from: accounts[0]});
    const cardId = result.logs[0].args._cardId.c[0];
    const projectId = result.logs[0].args._projectId.c[0];
    assert.equal(cardId, 1, "wrong cardId");
    assert.equal(projectId, 1, "wrong projectId");
  })

  it("should claim the first card", async () => {
    let instance = await EthKan.deployed();
    let result = await instance.claimCard(1, {from: accounts[1]});
    const cardId = result.logs[0].args._cardId.c[0];
    const projectId = result.logs[0].args._projectId.c[0];
    const claimer = result.logs[0].args._claimer;
    assert.equal(cardId, 1, "wrong cardId");
    assert.equal(projectId, 1, "wrong projectId");
    assert.equal(claimer, accounts[1], "wrong claimer");
  })

  it("should fund the first card", async () => {
    let instance = await EthKan.deployed();
    let result = await instance.fundCard(1, 7654321, {from: accounts[2]});
    const cardId = result.logs[0].args._cardId.c[0];
    const projectId = result.logs[0].args._projectId.c[0];
    const amount = result.logs[0].args._amount.c[0];
    const funder = result.logs[0].args._funder;
    assert.equal(cardId, 1, "wrong cardId");
    assert.equal(projectId, 1, "wrong projectId");
    assert.equal(amount, 7654321, "wrong amount");
    assert.equal(funder, accounts[2], "wrong funder");
  })

  it("should approve the first card", async () => {
    let instance = await EthKan.deployed();
    let result = await instance.approveCard(1, {from: accounts[0]});
    const cardId = result.logs[0].args._cardId.c[0];
    const projectId = result.logs[0].args._projectId.c[0];
    const funds = result.logs[0].args._funds.c[0];
    const claimer = result.logs[0].args._claimer;
    assert.equal(cardId, 1, "wrong cardId");
    assert.equal(projectId, 1, "wrong projectId");
    assert.equal(funds, 7654321, "wrong funds");
    assert.equal(claimer, accounts[1], "wrong claimer");
  })

  it("should have 1 card associated to creator address", async () => {
    let instance = await EthKan.deployed();
    let result = await instance.myCards.call({from: accounts[0]});
    assert.equal(result.length, 1, "wrong length for associated cards");
  })

  it("should have 1 project associated to creator address", async () => {
    let instance = await EthKan.deployed();
    let result = await instance.myProjects.call({from: accounts[0]});
    assert.equal(result.length, 1, "wrong length for associated projects");
  })

});