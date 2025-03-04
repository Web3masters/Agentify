let cards = [
    {
        id: "decent",
        title: "Decentramized",
        category: "Memes",
        verified: true,
        creator: "Samuel John",
        description: "Suggests decentralized and intelligent operations. Which is used in Blockchain Transactions",
        status: [
            { number: 3452, text: "Interactions" },
            { number: 24, text: "Available Functions" }
        ],
        buttons: [
            { text: "Run Agent", onClick: () => console.log("Run Agent"), variant: "filled" }
        ]
    },
    {
        id: "agentbit",
        title: "Agent Bit",
        category: "DeFi",
        verified: true,
        creator: "Satoshi Nakamoto",
        description: "Suggests decentralized and intelligent operations. Which is used in Blockchain Transactions",
        status: [
            { number: "21 million", text: "Interactions" },
            { number: 24, text: "Available Functions" }
        ],
        buttons: [
            { text: "Run Agent", onClick: () => console.log("Run Agent"), variant: "filled" }
        ]
    },
]

export default cards;