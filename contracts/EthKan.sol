pragma solidity ^0.4.17;

import "./safemath.sol";

// This is an experimental work in progres

contract EthKan {

    using SafeMath for uint256;

    event NewProject(uint _projectId, address _owner);
    event NewCard(uint _cardId, uint _projectId, address _owner);
    event NewClaim(uint _cardId, uint _projectId, address _claimer);
    event NewFunds(uint _cardId, uint _projectId, uint _amount, address _funder);
    event NewApproval(uint _cardId, uint _projectId, uint _funds, address _claimer);

    struct Card {
        bool exists;
        uint id;
        uint projectId;
        uint balance;
        address owner;
        address claimedBy;
        string status;
    }
  
    uint public cardCount = 0;
    mapping (uint => Card) private cards;
    mapping (address => uint[]) private ownerToCards;

    uint public projectCount = 0;
    mapping (string => uint) private projects;
    mapping (address => uint[]) private ownerToProjects;

    mapping (uint => address) private projectToOwner;
    mapping (uint => uint[]) private projectToCards;

    function createProject(string tokenSymbol) public returns (uint) {
        require(projects[tokenSymbol] == 0);
        projectCount++;
        projects[tokenSymbol] = projectCount;
        projectToOwner[projectCount] = msg.sender;
        ownerToProjects[msg.sender].push(projectCount);
        NewProject(projectCount, msg.sender);
        return projectCount;
    }

    function createCard(string tokenSymbol) public returns (uint) {
        require(projects[tokenSymbol] != 0);
        cardCount++;
        cards[cardCount] = Card(
            true, 
            cardCount, 
            projects[tokenSymbol], 
            0, 
            msg.sender, 
            address(0x0), 
            "deployed"
        );
        ownerToCards[msg.sender].push(cardCount);
        projectToCards[projects[tokenSymbol]].push(cardCount);
        NewCard(cardCount, projects[tokenSymbol], msg.sender);
        return cardCount;
    }

    function claimCard(uint _cardId) public {
        require(cards[_cardId].exists == true);
        cards[_cardId].claimedBy = msg.sender;
        cards[_cardId].status = "claimed";
        NewClaim(_cardId, cards[_cardId].projectId, msg.sender);
    }

    function fundCard(uint _cardId, uint _amount) public {
        require(cards[_cardId].exists == true);
        Card c = cards[_cardId];
        require(keccak256(c.status) != keccak256("approved"));
        c.balance = c.balance + _amount;
        NewFunds(_cardId, c.projectId, _amount, msg.sender);
    }

    function approveCard(uint _cardId) public {
        require(cards[_cardId].exists == true);
        require(cards[_cardId].owner == msg.sender);
        uint _funds = cards[_cardId].balance;
        Card c = cards[_cardId];
        c.balance = 0;
        c.status = "approved";
        NewApproval(_cardId, c.projectId, _funds, c.claimedBy);
    }
    
    function cardInfo(uint _cardId) public view returns (uint, uint, address, address, string) {
        require(cards[_cardId].exists);
        Card c = cards[_cardId];
        return (c.projectId, c.balance, c.owner, c.claimedBy, c.status);
    }

    function myCards() public view returns (uint[]) {
        return ownerToCards[msg.sender];
    }
    
    function projectInfo(string _projectSymbol) public view returns (uint[], address) {
        // require(projects[_projectSymbol] != 0);
        uint projectId = projects[_projectSymbol];
        return (projectToCards[projectId], projectToOwner[projectId]);
    }

    function myProjects() public view returns (uint[]) {
        return ownerToProjects[msg.sender];
    }
}