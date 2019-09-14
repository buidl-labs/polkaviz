import React from 'react'
import { WsProvider, ApiPromise } from "@polkadot/api";
import { Stage, Layer, Arc, Circle, Text} from "react-konva";
import Validators from './Validators'


class NominatorApp extends React.Component{
    constructor() {
        super();
        this.latestBlockAuthor = undefined;
        this.state = {
          validators: [],
          nominator: [],
          controllerId:"",
          valbacked:[],
          totalbonded: 0,
          isloading:true
        };
        this.ismounted = true
      }
      componentDidMount() {
        this.createApi();
      }
      async createApi() {
        const provider = new WsProvider("wss://poc3-rpc.polkadot.io");
        const api = await ApiPromise.create(provider);
        const stakers = await api.derive.staking.info(this.props.match.params.nominatorAddress)
        //  "5F7RKWLXYMPvDi7Z5vW75QUHKnN4D4DY9RzFhgzfMeVNEswE"

        //  vals = 5CnDngcL3NE8x1rdxrmDWEjmgLrPm5KBsCy8uTqRQCRWx74m
        //         5Enp67VYwLviZWuyf2XfM5mJXgTWHaa45podYXhUhDCUeYfg

        const value = JSON.parse(stakers);
        console.log(value,value.controllerId)
        this.setState({
            controllerId:value.controllerId
        })
        await api.query.session.validators(validators => {
          const sessionValidators = validators.map(x => x.toString());
          if(this.ismounted){
          this.setState({ validators: sessionValidators });
          }
        });
      console.log("hi")
      console.log(this.state.nominator,this.state.validators)
    
      async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }
      const start = async () => {
        let arr1 =[]
        let count =0
        let bonded = 0
        await asyncForEach(this.state.validators, async (val) => {
          console.log(val,count++)
          let stakers = await api.derive.staking.info(val)
          let stakeinfo = JSON.parse(stakers)
          console.log(stakeinfo.stakers.others)
          stakeinfo.stakers.others.forEach(ele => {
            if(ele.who === this.props.match.params.nominatorAddress)
            {
              arr1.push(val)
              bonded += ele.value /Math.pow(10,15)
            }
          })
        });
        console.log('Done');
        console.log(arr1)
        this.setState({
          valbacked:arr1,
          totalbonded: bonded,
          isloading:false
        })
      }
      start();
      
      }

    render(){
        let nominatorname = "Nominator: " +  this.props.match.params.nominatorAddress
        let stashname= this.state.controllerId.toString().slice(0,8) + "......" + this.state.controllerId.toString().slice(-8)
        let controllername = "Controller: " + stashname
        let bondvalue = "bonded: " + this.state.totalbonded.toString().slice(0,5) + " DOT"

        let arr=this.state.valbacked
        const width = window.innerWidth;
        const height = window.innerHeight;
        return(
          
      this.state.isloading ? (<React.Fragment><div className="lds-ripple"><div></div><div></div></div><div className="lds-text" style={{left:"42%"}}>Fetching Validators.....</div></React.Fragment>) : (
        <React.Fragment>
                <Stage width={width} height={height}>
                    <Layer>
                    <Validators allvals={arr}  rect_x={width/2} circ_x={width/2-200} circ_y={height/2}/>
                    <Arc
              x={width - 2}
              y={height / 2}
              innerRadius={height / 2 - 25}
              outerRadius={height / 2 - 24}
              rotation={90}
              angle={180}
              stroke="white"
            />

            <Circle
                x={width/2-200}
                y={height/2}
                radius={7} 
                fill="white"
                />
                        <Text text={nominatorname} x= {width/30} y={height/30} fill="#FFFFFF" fontSize={20}/>
                        <Text text={controllername} x={width/30} y={height-height/30} fill="#FFFFFF" fontSize={17} />
                        <Text text={bondvalue} x={width/3} y={height-height/30} fill="#FFFFFF" fontSize={17} />

                    </Layer>
                </Stage>
                
            </React.Fragment>
      )
         )
      
    }
}

export default NominatorApp