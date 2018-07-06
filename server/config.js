module.exports = {
  port: 3000,
  dbConnectionString: 'postgres://postgres:postgres@localhost:5432/ccc', // CHANGE BEFORE PUSHING, I HAVE OTHER USER THAN TIM
  // dbConnectionString: 'postgres://ola:postgres@localhost:5432/ccc', // CHANGE BEFORE PUSHING, I HAVE OTHER USER THAN TIM
  saltRounds: 2,
  jwtSecret: 'this-is_top-secret',
  tokenExpireTime: '6h'
};
