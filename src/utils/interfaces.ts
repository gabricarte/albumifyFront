export interface ApiResponse {
    album: {
      artist: string;
      mbid: string;
      tags: {
        tag: {
          url: string;
          name: string;
        }[];
      };
      playcount: string;
      image: {
        size: string;
        "#text": string;
      }[];
      tracks: {
        track: {
          streamable: {
            fulltrack: string;
            "#text": string;
          };
          duration: number;
          url: string;
          name: string;
          "@attr": {
            rank: number;
          };
          artist: {
            url: string;
            name: string;
            mbid: string;
          };
        }[];
      };
      url: string;
      name: string;
      listeners: string;
      wiki: {
        published: string;
        summary: string;
        content: string;
      };
    };
  }
  
  export interface album {
    "name": string, 
    "artist": string, 
    "summary": string
  }

  export interface albumApiResponse {
    id: number;
    name: string;
    artist: string;
    summary: string;
  }
  
  