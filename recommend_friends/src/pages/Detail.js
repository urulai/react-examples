import React from 'react';
import Chance from 'chance';

class Detail extends React.Component {

	getUsers() {
		let users = [], count = 10;

        for (let idx = 0; idx < count; idx++) {
            users.push({
                name: chance.first(),
                phone: chance.phone(),
                address: chance.address(),
                id: chance.string()
            });
        }
		return users;
	}

	genList(users) {
		return 	<table>
					<tbody>
						<tr>
							<th>Name</th>
							<th>Phone</th>
							<th>Address</th>
						</tr>

			            { 
			            	users.map((user, idx) => (
			            		<tr key={user.id}>
			            			<td>{user.name}</td>
			            			<td>{user.phone}</td>
			            			<td>{user.address}</td>
			            		</tr>
			        		))
			        	}

			       	</tbody>
	            </table>;
	}

    constructor(props) {
        super(props);

        this.state = {
            list: ""
        };
    }

	buttonClicked() {
		let that = this;
		const newList = {
		    list: that.genList(that.getUsers())
		};

		this.setState(newList);
	}

	render() {
		return <div>
			{this.state.list}

			<button onClick={this.buttonClicked.bind(this)}>Meet new folks!</button>
		</div>;
	}
}

export default Detail;