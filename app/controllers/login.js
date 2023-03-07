const https = require('https')

const showPokemon = (req, res) => {
  const pokemonID = req.params.id
  if(isNaN(Number(pokemonID))) return res.status(400).send('The id should be a number')
    const options = {
        hostname: 'pokeapi.co',
        path: `/api/v2/pokemon/${pokemonID}`,
        method: 'GET',
        port: 443
      }

      const processData = (apiRes) => { 
          let data = '';
          apiRes.on('data', chunk => {
            data += chunk;
          });
          apiRes.on('end', () => {
            if(data === 'Not Found') return res.status(404).send('This pokemon does not exist. Yet.')
            const pokemon = JSON.parse(data);
            const result = `The name of this pokemon is ${pokemon.name}. His height is ${Number(pokemon.height) * 10}cm, and it weighs ${Number(pokemon.weight) / 10}kg.`
            return res.send(result)
          });
          
      }
    
      const petition = https.request(options, apiRes => {
         processData(apiRes)
      })


      petition.on('error', error => {
        console.error(error)
        res.statusCode = 500
        res.end()
      })
      
      petition.end();
    }

module.exports = {showPokemon}