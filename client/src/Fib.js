import React,{Component} from "react";
import axios from 'axios';

class Fib extends Component{
    state={
        seenIndexes:[],
        fibValues:{},
        index:''
    };

    componentDidMount(){
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues(){
        const values=await axios.get('/api/values/current');
        this.setState({fibValues:values.data});
    }

    async fetchIndexes(){
        const seenIndexes=await axios.get('api/values/all');
        this.setState({
            seenIndexes:seenIndexes.data
        });
    }

    renderSeenIndexes(){
        return this.state.seenIndexes.map(({seen_index})=> seen_index).join(', ');
    }

    renderValues(){
        const entries=[];
        for(let key in this.state.fibValues){
            entries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.fibValues[key]}
                </div>
            )
        }
        return entries;
    }

    handleSubmit= async (event)=>{
        event.preventDefault();
        await axios.post('/api/values',{
            index:this.state.index
        });
        this.setState({index:''});
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index</label>
                    <input value={this.state.index} 
                        onChange={event=>this.setState({index:event.target.value})}
                    />
                    <button>Submit</button>
                </form>
                <h3>Indexes I have seen</h3>
                {this.renderSeenIndexes()}
                <h3>Calculated Values</h3>
                {this.renderValues()}
            </div>
        )
    }
}

export default Fib;