
import React from 'react';
import ReactDOM from 'react-dom';

// kísérleti mintaelemhez
// megoldás (inkább!); megszüntetés, megszűnés; oldás, oldódás (le~/fel~); oldat; kiszabadulás; kiszabadítás

export class Summary extends React.Component {
  render() {
    return (
	<div>
		<div className='foreign-word'>
			die Lösung, -en
		</div>
		<div className='meaning'>
			<div className='random-light-color-1 meaning-group'>
				<div className='meaning-group-content'>
					<div className='close-meaning-group'>
						<div className='close-meaning primary-meaning'>
							megoldás
						</div>
					</div>
				</div>
			</div>
			<div className='random-light-color-2 meaning-group'>
				<div className='meaning-group-content'>
					<div className='close-meaning-group'><div className='close-meaning'>megszüntetés</div></div>
					<div className='close-meaning-group'><div className='close-meaning'>megszűnés</div></div>
				</div>
			</div>
			<div className='random-light-color-3 meaning-group'>
				<div className='meaning-group-content'>
					<div className='close-meaning-group'><div className='close-meaning'>oldás</div></div>
					<div className='close-meaning-group'><div className='close-meaning'>feloldódás</div></div>
				</div>
				<div className='meaning-group-level-comment'>(le~/fel~)</div>
			</div>
			<div className='random-light-color-4 meaning-group'>
				<div className='meaning-group-content'>
					<div className='close-meaning-group'><div className='close-meaning'>oldat</div></div>
				</div>
			</div>
			<div className='random-light-color-5 meaning-group'>
				<div className='meaning-group-content'>
					<div className='close-meaning-group'><div className='close-meaning'>kiszabadulás</div></div>
					<div className='close-meaning-group'><div className='close-meaning'>kiszabadítás</div></div>
				</div>
			</div>
		</div>
	</div>
    );
  }
}
