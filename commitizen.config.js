const types = [
  {
    value: "feat",
    name: "✨ feat:\tA new feature",
  },
  {
    value: "fix",
    name: "🐞 fix:\t A bug fix",
  },
  {
    value: "chore",
    name: "🔩 chore:\t Doesn't modify src or test files",
  },
  {
    value: "docs",
    name: "📚 docs:\t Update or change to the documentation",
  },
  {
    value: "build",
    name: "🚀 build:\t Build system config or external dependencies",
  },
  {
    value: "refactor",
    name: "♻ refactor:\t Neither fixes a bug nor adds a feature",
  },
  {
    value: "revert",
    name: "⏪ revert:\t Reverts a previous commit",
  },
];

const scopes = ["config", "publication"].map((name) => ({
  name,
}));

module.exports = {
  types,
  scopes,
  messages: {
    type: "Type of change that you're committing:",
    scope: "\nSCOPE of this change (optional):",
    customScope: "Custom SCOPE of this change:",
    subject: "SHORT, IMPERATIVE tense description:\n",
    body: "LONGER description change (optional):\n",
    breaking: "BREAKING CHANGES (optional):\n",
    footer: "CLOSED ISSUES (optional):\n",
    confirmCommit: "Are you sure you want to commit?",
  },
  allowCustomScopes: false,
  allowBreakingChanges: ["feat", "fix"],
  subjectLimit: 60,
};
