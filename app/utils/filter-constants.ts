export const maps = ["Haven", "Fracture", "Ascent", "Icebox", "Split", "Bind"];

export const tags = [
  "Bug",
  "Lineup",
  "News",
  "Gameplay",
  "Educational",
  "Meta",
];

export const tagsColors = {
  Educational: "green",
  News: "blue",
  Gameplay: "purple",
  Bug: "red",
  Meta: "teal",
};

const agentIcons = [
  {
    icon: "https://media.valorant-api.com/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/displayicon.png",
    name: "Astra",
  },
  {
    icon: "https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayicon.png",
    name: "Breach",
  },
  {
    icon: "https://media.valorant-api.com/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/displayicon.png",
    name: "Brimstone",
  },
  {
    icon: "https://media.valorant-api.com/agents/22697a3d-45bf-8dd7-4fec-84a9e28c69d7/displayicon.png",
    name: "Chamber",
  },
  {
    icon: "https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/displayicon.png",
    name: "Cypher",
  },
  {
    icon: "https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png",
    name: "Jett",
  },
  {
    icon: "https://media.valorant-api.com/agents/601dbbe7-43ce-be57-2a40-4abd24953621/displayicon.png",
    name: "KAY/O",
  },
  {
    icon: "https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/displayicon.png",
    name: "Killjoy",
  },
  {
    icon: "https://media.valorant-api.com/agents/bb2a4828-46eb-8cd1-e765-15848195d751/displayicon.png",
    name: "Neon",
  },
  {
    icon: "https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png",
    name: "Omen",
  },
  {
    icon: "https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png",
    name: "Phoenix",
  },
  {
    icon: "https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayicon.png",
    name: "Raze",
  },
  {
    icon: "https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png",
    name: "Reyna",
  },
  {
    icon: "https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png",
    name: "Sage",
  },
  {
    icon: "https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayicon.png",
    name: "Skye",
  },
  {
    icon: "https://media.valorant-api.com/agents/ded3520f-4264-bfed-162d-b080e2abccf9/displayicon.png",
    name: "Sova",
  },
  {
    icon: "https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png",
    name: "Viper",
  },
  {
    icon: "https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png",
    name: "Yoru",
  },
];

export const agentIcons1 = agentIcons.slice(0, agentIcons.length / 3);
export const agentIcons2 = agentIcons.slice(
  agentIcons.length / 3,
  (agentIcons.length / 3) * 2
);
export const agentIcons3 = agentIcons.slice(
  (agentIcons.length / 3) * 2,
  agentIcons.length
);

export const agents = agentIcons.map((e) => e.name);
