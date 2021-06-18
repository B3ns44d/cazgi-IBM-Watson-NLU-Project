import React from 'react';
import './bootstrap.min.css';
const EmotionTable = (emotions) => {
	const data = emotions.emotions.result.emotion.document.emotion;
	const resultKeys = Object.entries(data);
	return (
		<div>
			<table className="table table-bordered">
				<tbody>
					{resultKeys.map(([key, value], index) => {
						return (
							<tr key={index}>
								<td>{key}</td>
								<td>{value}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default EmotionTable;
