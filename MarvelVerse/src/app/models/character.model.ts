
export interface Character {
  id: number;           
  name: string;         
  description: string;  
  modified: string;    
  thumbnail: {         
    path: string;       
    extension: string; 
  };

}

export interface CharacterDataWrapper {
  code: number;           
  status: string;    
  data: CharacterDataContainer; 
}


export interface CharacterDataContainer {
  offset: number;     
  limit: number;    
  total: number;      
  count: number;     
  results: Character[]; 
}