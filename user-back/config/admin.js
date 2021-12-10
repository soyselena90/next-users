module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8ba286bd5e6f52a3f411219c01f40286'),
  },
});
