export const templates = {
  confirmEmail: (data: { name: string; link: string }) =>
    import("./confirm-email").then((mod) => mod.ConfirmEmail(data)),
};
