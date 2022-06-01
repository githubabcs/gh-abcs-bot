/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("issues.opened", async (context) => {
    // Load config from .github/config.yml in the repository
    const config = context.config('config.yml')
    app.log.info(config);

    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  app.on("issues.edited", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for editing this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  app.on("issues.closed", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for closing this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  app.on("push", async (context) => {
    app.log.info(context);
  });

  app.onAny(async (context) => {
    app.log.info({ event: context.name, action: context.payload.action });
  });
};
