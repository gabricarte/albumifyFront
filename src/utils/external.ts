const apiKey = 'fbb6863a69641c4bfef033a9002e3276'; 

export const getTopArtists = async () =>{
    try{
      const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${apiKey}&format=json`);
      if (response.ok){
        const data = await response.json(); 
        let artists = data.artists.artist;
        return artists;
      }
    }catch (error){
      console.log(error);
    }
}