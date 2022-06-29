import Place from './Place';

function Day(props){
  // Reorganize data into a place to list hashmap
  let places = {}; // A hash map of place => list of lectures
  for (let item of props.data){
    if (Object.keys(places).indexOf(item.place) < 0){
      places[item.place] = [];
    }
    places[item.place].push(item);
  }
  let length = Object.keys(places).length;
  let placedData = Object.keys(places).map(
    (placeKey, i) => 
    <Place daySpan={Object.keys(places).length} key={i} data-key={i} dayName={props.name} name={placeKey} data={places[placeKey]} lastOne={i} length={length}/>
  )
  
  return placedData;
}

export default Day;
