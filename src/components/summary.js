
import React from 'react';
import ReactDOM from 'react-dom';

// kísérleti mintaelemhez
// megoldás (inkább!); megszüntetés, megszűnés; oldás, oldódás (le~/fel~); oldat; kiszabadulás; kiszabadítás

export class Summary extends React.Component {
  render() {
    return (
	<div>
		<div class='random--light-color-1'>
			<div class='meaning-group'>
				<div class='close-meaning-group'>
					<div class='close-meaning primary-meaning'>
						megszüntetés
					</div>
				</div>
			</div>
		</div>
		<div class='random--light-color-1'>
			<div class='meaning-group'>
				<div class='close-meaning-group'><div class='close-meaning'>megszüntetés</div></div>
				<div class='close-meaning-group'><div class='close-meaning'>megszűnés</div></div>
			</div>
		</div>
		<div class='random--light-color-1'>
			<div class='meaning-group'>
				<div class='close-meaning-group'><div class='close-meaning'>oldás</div></div>
				<div class='close-meaning-group'><div class='close-meaning'>feloldódás</div></div>
			</div>
			<div class='meaning-group-level-comment'>(le~/fel~)</div>
		</div>
		<div class='random--light-color-1'>
			<div class='meaning-group'>
				<div class='close-meaning-group'><div class='close-meaning'>oldat</div></div>
			</div>
		</div>
		<div class='random--light-color-1'>
			<div class='meaning-group'>
				<div class='close-meaning-group'><div class='close-meaning'>kiszabadulás</div></div>
				<div class='close-meaning-group'><div class='close-meaning'>kiszabadítás</div></div>
			</div>
		</div>
	</div>
    );
  }
}
