## Mongodb Setup

### Add mongo users
###### With the mongo client, run the following command:
    use bang
    db.users.insert({ username: 'test', userHash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', password: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'})
    db.users.insert({ username: 'test1', userHash: '1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014', password: '1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014'})
    db.users.insert({ username: 'test2', userHash: '60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752', password: '60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752'})
    db.users.insert({ username: 'test3', userHash: 'fd61a03af4f77d870fc21e05e7e80678095c92d808cfb3b5c279ee04c74aca13', password: 'fd61a03af4f77d870fc21e05e7e80678095c92d808cfb3b5c279ee04c74aca13'})
    db.users.insert({ username: 'test4', userHash: 'a4e624d686e03ed2767c0abd85c14426b0b1157d2ce81d27bb4fe4f6f01d688a', password: 'a4e624d686e03ed2767c0abd85c14426b0b1157d2ce81d27bb4fe4f6f01d688a'})
    db.users.insert({ username: 'test5', userHash: 'a140c0c1eda2def2b830363ba362aa4d7d255c262960544821f556e16661b6ff', password: 'a140c0c1eda2def2b830363ba362aa4d7d255c262960544821f556e16661b6ff'})
    db.users.insert({ username: 'test6', userHash: 'ed0cb90bdfa4f93981a7d03cff99213a86aa96a6cbcf89ec5e8889871f088727', password: 'ed0cb90bdfa4f93981a7d03cff99213a86aa96a6cbcf89ec5e8889871f088727'})

    You now have test users with the following user/pass combinations:
    test  / test
    test1 / test1
    test2 / test2
    test3 / test3
    test4 / test4
    test5 / test5
    test6 / test6

