const fs = require('fs')

const requestProxy = require("request").defaults({
  proxy: "http://127.0.0.1:7890",
  rejectUnauthorized: false,
})

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const query_url = 'https://graphigo.prd.galaxy.eco/query'

let all = false
let new_campains = ''

async function get_campaign(id) {
  let body = await synchronous_request(query_url, {
    operationName: 'Campaign',
    variables: {
      address: '0xdeaddeaddeaddeaddeaddeaddeaddeaddeaddead',
      id: id
    },
    query: "query Campaign($id: ID!, $address: String!) {\n  campaign(id: $id) {\n    id\n    numberID\n    name\n    cap\n    info\n    useCred\n    formula\n    status\n    creator\n    creds {\n      id\n      name\n      type\n      referenceLink\n      chain\n      staticEligible(value: $address)\n      subgraph {\n        endpoint\n        query\n        expression\n        eligible(address: $address)\n        __typename\n      }\n      __typename\n    }\n    numNFTMinted\n    thumbnail\n    gasType\n    createdAt\n    requirementInfo\n    description\n    enableWhitelist\n    chain\n    startTime\n    requireEmail\n    requireUsername\n    childrenCampaigns {\n      id\n      cap\n      numberID\n      status\n      dao {\n        id\n        name\n        logo\n        alias\n        __typename\n      }\n      parentCampaign {\n        id\n        __typename\n      }\n      thumbnail\n      name\n      gasType\n      numNFTMinted\n      description\n      requirementInfo\n      startTime\n      chain\n      requireEmail\n      requireUsername\n      endTime\n      useCred\n      formula\n      creator\n      creds {\n        id\n        name\n        type\n        referenceLink\n        staticEligible(value: $address)\n        subgraph {\n          endpoint\n          query\n          expression\n          eligible(address: $address)\n          __typename\n        }\n        __typename\n      }\n      numNFTMinted\n      whitelistInfo(address: $address) {\n        address\n        maxCount\n        usedCount\n        __typename\n      }\n      gamification {\n        id\n        type\n        airdrop {\n          name\n          contractAddress\n          token {\n            address\n            icon\n            symbol\n            __typename\n          }\n          merkleTreeUrl\n          addressInfo(address: $address) {\n            index\n            amount {\n              amount\n              ether\n              __typename\n            }\n            proofs\n            __typename\n          }\n          __typename\n        }\n        nfts {\n          nft {\n            animationURL\n            treasureBack\n            category\n            powah\n            image\n            name\n            nftCore {\n              id\n              capable\n              chain\n              contractAddress\n              spaceStationAddress\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        forgeConfig {\n          minNFTCount\n          maxNFTCount\n          requiredNFTs {\n            nft {\n              category\n              powah\n              image\n              name\n              nftCore {\n                capable\n                contractAddress\n                spaceStationAddress\n                __typename\n              }\n              __typename\n            }\n            count\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      whitelistSubgraph {\n        query\n        endpoint\n        expression\n        variable\n        __typename\n      }\n      __typename\n    }\n    whitelistInfo(address: $address) {\n      address\n      maxCount\n      usedCount\n      __typename\n    }\n    endTime\n    dao {\n      id\n      name\n      logo\n      alias\n      nftCores {\n        list {\n          capable\n          marketLink\n          contractAddress\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    gamification {\n      id\n      type\n      airdrop {\n        name\n        contractAddress\n        token {\n          address\n          icon\n          symbol\n          __typename\n        }\n        merkleTreeUrl\n        addressInfo(address: $address) {\n          index\n          amount {\n            amount\n            ether\n            __typename\n          }\n          proofs\n          __typename\n        }\n        __typename\n      }\n      nfts {\n        nft {\n          animationURL\n          category\n          powah\n          image\n          name\n          treasureBack\n          nftCore {\n            id\n            capable\n            chain\n            contractAddress\n            spaceStationAddress\n            name\n            symbol\n            dao {\n              id\n              name\n              logo\n              alias\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      forgeConfig {\n        minNFTCount\n        maxNFTCount\n        requiredNFTs {\n          nft {\n            category\n            powah\n            image\n            name\n            nftCore {\n              capable\n              contractAddress\n              spaceStationAddress\n              __typename\n            }\n            __typename\n          }\n          count\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    whitelistSubgraph {\n      query\n      endpoint\n      expression\n      variable\n      __typename\n    }\n    __typename\n  }\n}\n"
  })

  return body.data.campaign
}

async function sync_dao(alias, new_space) {
  let last_items = []
  if (!new_space) {
    last_items = JSON.parse(fs.readFileSync('./data/' + alias + '.json').toString())
  }
  let total = last_items.length

  let body = await synchronous_request(query_url, {
    operationName: 'Dao',
    variables: {
      alias: alias,
      first: 500
    },
    query: "query Dao($alias: String, $name: String, $id: Int, $first: Int, $after: String) {\n  dao(id: $id, name: $name, alias: $alias) {\n    id\n    name\n    logo\n    alias\n    info\n    twitter\n    github\n    discord\n    medium\n    telegram\n    facebook\n    storeOpensea\n    storeTreasureLand\n    storeElement\n    campaigns(first: $first, after: $after) {\n      list {\n        id\n        name\n        info\n        description\n        thumbnail\n        status\n        childrenCampaigns {\n          id\n          gamification {\n            id\n            type\n            nfts {\n              nft {\n                treasureBack\n                nftCore {\n                  id\n                  contractAddress\n                  spaceStationAddress\n                  __typename\n                }\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        gamification {\n          id\n          type\n          nfts {\n            nft {\n              category\n              powah\n              image\n              name\n              treasureBack\n              nftCore {\n                id\n                name\n                symbol\n                spaceStationAddress\n                dao {\n                  id\n                  name\n                  logo\n                  alias\n                  __typename\n                }\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      pageInfo {\n        endCursor\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
  })

  let list = body.data.dao.campaigns.list
  console.log('\ttotal campaigns: ' + list.length)
  let counter = 0
  for (let item of list) {
    
    let mark = '    '
    if (!last_items.includes(item.id)) {
      let campaign = await get_campaign(item.id)
      //console.log(campaign)
      if (all || campaign.startTime * 1000 <= new Date().getTime() && (campaign.endTime * 1000 == 0 || campaign.endTime * 1000 > new Date().getTime())) {
        last_items.push(item.id)
        mark = '****'
      }
    }

    if (all || mark == '****') {
      let url = 'https://galaxy.eco/' + alias + '/campaign/' + item.id
      console.log('\t' + mark + mark + ' ' + item.name + ', status:' + item.status + '\n\t\t ' + url)
      if (mark == '****') {
        //let campaign = await get_campaign(item.id)
        //let start_datestr = get_datestr(new Date(campaign.startTime * 1000))
        //new_campains += '\t' + url + ', start date: ' + start_datestr + '\n'
        new_campains += '\t' + url + '\n'
      }
      counter++
    }
  }
  if (!all && counter == 0) {
    console.log('\tno new campaigns since last sync')
  }

  if (last_items.length > total) {
    fs.writeFileSync('./data/' + alias +'.json', JSON.stringify(last_items))
  }

}

async function main() {
  
  if (process.argv.length >= 3 && process.argv[2] == '/all') all = true
  
  let last_spaces = []
  try {
    last_spaces = JSON.parse(fs.readFileSync('./data/_spaces.json').toString())
  } catch (err) {

  }

  let body = await synchronous_request(query_url, {
    operationName: 'Daos',
    variables: {},
    query: "query Daos {\n  daos {\n    id\n    name\n    logo\n    alias\n    __typename\n  }\n}\n"
  })

  console.log('total spaces: ' + body.data.daos.length)
  
  for (let dao of body.data.daos) {
    //if (dao.id != 37) continue

    let new_space = false
    if (!last_spaces.includes(dao.id)) {
      new_space = true
      last_spaces.push(dao.id)
    }
    console.log('\n(new space?)' + new_space + '/(name is:)' + dao.name + '/(id=)' + dao.id + '/(url is:)https://galaxy.eco/' + dao.alias)
    
    await sleep(1000)
    try {
      await sync_dao(dao.alias, new_space)
    } catch (err) {
      console.log('sync ' + dao.name + ' error')
    }
  }
  
  fs.writeFileSync('./data/_spaces.json', JSON.stringify(last_spaces))

  if (new_campains != '') {
    console.log('\n\nNew Campaigns:')
    console.log(new_campains)
  }

  let start_str = get_datestr(new Date())
  //let start_str = start_date.toLocaleDateString() + ' ' + start_date.toLocaleTimeString()
  console.log('\nsync date: ' + start_str)
} 

function get_datestr(start_date) {
  return start_date.toLocaleDateString() + ' ' + start_date.toLocaleTimeString()
}

// helper methods
let synchronous_request = function (url, params) {


  if (params == undefined) {
    let options = {
      url: url,
      form: params
    }

    console.log(options)
    return new Promise(function (resolve, reject) {
      // If you don't use proxy, require("request").get(...) is ok
      // require("request").get(options, function (error, response, body) {
      requestProxy.get(options, function (error, response, body) {
            if (error) {
                reject(error)
            } else {
                resolve(body)
            }
        })
    })
  } else {
    let options = {
      url: url,
      json: params
    }

    //console.log(options)

    return new Promise(function (resolve, reject) {
      requestProxy.post(options, function (error, response, body) {
        if (error) {
            reject(error)
        } else {
            resolve(body)
        }
      })
    })
  }
}

main()
