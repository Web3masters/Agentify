let cards = [
    {
        id: "decent",
        title: "Decentramized",
        published: true,
        creator: "Samuel John",
        showEditButton: true,
        description: "Description for Decentramized. Suggests decentralized and intelligent operations. Which is used in Blockchain Transactions",
        buttons: [
            { text: "Publish Now", onClick: () => console.log("Publish Now"), variant: "outlined" },
            { text: "Test Agent", onClick: () => window.location.href = "/playground", variant: "filled" }
        ]
    },
    {
        id: "agentbit",
        title: "Agent Bit",
        published: false,
        creator: "Satoshi Nakamoto",
        showEditButton: true,
        description: "Description for Agent Bit. Suggests decentralized and intelligent operations. Which is used in Blockchain Transactions",
        buttons: [
            { text: "Publish Now", onClick: () => console.log("Publish Now"), variant: "outlined" },
            { text: "Test Agent", onClick: () => window.location.href = "/playground", variant: "filled" }
        ]
    },
]

export default cards;