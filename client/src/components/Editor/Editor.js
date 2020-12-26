import React from "react"
import * as Yup from 'yup';
import styled from 'styled-components';
import { Formik, Form, Field, FieldArray, useField , ErrorMessage, getIn} from 'formik';

const pruneBlank = (cull,o) => {
	cull.forEach(arrName=>{
		var keep = []
		if (o[arrName]){
			keep = o[arrName].filter(
				name => 
					(name.first && name.first.trim().length >0 ) || (name.last && name.last.trim().length>0 )
			)
		}
		if (keep.length > 0) {
			o[arrName] = keep
		} else {
			delete o[arrName]
		}
	})
	return(o)
}

const NameListInput = ({
	arrayHelpers,
	arrayName,
	vals
}) =>
	<div>
		{vals.map((friend, index) => (
			<Columns key={index}>
				<Column>
					<MyTextInput label="First" name={`${arrayName}[${index}].first`} />
				</Column>
				<Column>
					<MyTextInput label="Last" name={`${arrayName}[${index}].last`} />
				</Column>
				<Column size="1rem">
					<Button type="button" red onClick={() => arrayHelpers.remove(index)}>-</Button>
				</Column>
			</Columns>
         ))}
         <Button
           type="button"
          onClick={() => arrayHelpers.push({ last: '', first: '' })}
         >
           +
         </Button>
	</div>



export const FriendList = () => (
	<Formik
		initialValues={{
			title: "",
			authors: [
				{
					last:'Neckett',
					first:'Samuel'
				}
			],
			editors: [],
			translators: [],
			imprint: {
			 publisher: '',
			 place: '',
			 date: '',
		 },
		}}
		
		validationSchema={
		  Yup.object({
			  title: Yup.string().required('Required'),
			  imprint: Yup.object().shape({
				  				  date: Yup.string()
								  .required('Required'),
								  				  publisher: Yup.string()
												  .required('Required'),
				  place: Yup.string()
				  	.required('Required'),
			}),
	
		})}
		
		onSubmit={values =>
			setTimeout(() => {
				var pruned = Object.assign({},values)
				pruned = pruneBlank(['authors','editors','translators'], pruned)
				alert(JSON.stringify(pruned, null, 2));
			}, 500)
		}
       
		render={({ values }) => (
			<Form>
			<Box>
			<h3>Title</h3>
				  	  	<MyTextArea
            label="Title"
            name="title"
             type="textArea"
			 rows="4"
             placeholder="Fear and Trembling"
			 />
			</Box>
			<Box>
				<h3>Authorship</h3>
				<FieldArray
					name="authors"
					render= {arrayHelpers =>
						<NameListInput
							arrayName="authors"
							arrayHelpers={arrayHelpers}
							vals={values.authors} />}/>
				<h3>Editor</h3>
				<FieldArray
					name="editors"
					render={arrayHelpers =>
						<NameListInput
							arrayName="editors" 
							arrayHelpers={arrayHelpers} 
							vals={values.editors} />}/>
				<h3>Translator</h3>
				<FieldArray
					name="translators"
					render={arrayHelpers =>
						<NameListInput
							arrayName="translators" 
							arrayHelpers={arrayHelpers} 
							vals={values.translators} />}/>
				</Box>
				<Box>
					<h2>Imprint</h2>
			  	  	<MyTextInput
            label="Publisher"
            name="imprint.publisher"
             type="text"
             placeholder="Birmigham University Press"
			 />
			 		<Columns>
					<Column>
			 			  	  	<MyTextInput
            label="Place"
            name="imprint.place"
             type="text"
             placeholder="Birmigham "
			 />
			 </Column>
			 <Column>
						 			  	  	<MyTextInput
            label="Date"
            name="imprint.date"
             type="text"
             placeholder="2021"
			 />
			</Column>
			</Columns>
				</Box>
				<Box><Button type="submit">Submit</Button></Box>
			</Form>
		)}
	/>
)

const Button = styled.button`
	appearance: none;
	background: none;
	border: 0;
	cursor: pointer;
	font-size: 1.5rem;
	font-weight: bold;
	height: ${props => props.red ? "1.5rem" : "3rem"};
	letter-spacing: inherit;
	line-height: ${props => props.red ? "1.5rem" : "2rem"};
	margin-top: ${props => props.red ? "1.7rem" : "0"};
	margin-bottom: ${props => props.red ? "0" : "2rem"};
	outline: 0;
	overflow: hidden;
	padding: 0 ${props => props.red ? "1.2rem" : "1rem"};
	vertical-align: top;
	border-radius: 2rem;
	background: ${props => props.red ? "red" : "transparent"};
	box-shadow:0 0 0 2px #ffff inset;
	color: white;
`

const Box = styled.fieldset`
	display: block;
	border: 0;
	border-bottom: 2px solid rgba(0,0,0,0.2);
	padding: 0.5rem 2rem;
	
	&:last-child {
		border-bottom: 0;
		padding-top: 4rem;
	}
`


const Columns = styled.div`
	display: flex;
`
const Column = styled.div`
	flex: ${props => props.size ? `0 0 ${props.size}` : 1};
	&:not(:first-child){
		margin-left: 1rem;
	}
`

const TextInputInner = styled.div`
	margin-bottom: 1rem;
	
	label {
		display: block;
	}
	
	input, textarea {
		font-size: inherit;
		width: 100%;
		border-radius: 0;
		border: 2px solid ${props => props.error ? "red" : "transparent"};
				background:  ${props => props.error ? "pink" : "white"};
	}
	
	.error {
		color: pink;
		font-weight: 800;
	}
`

const MyTextArea = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<TextInputInner error={meta.touched && meta.error}>
			{/*<label htmlFor={props.id || props.name}>{label}</label>*/}
			<textarea {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
				) : null}
		</TextInputInner>
	);
};

const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<TextInputInner error={meta.touched && meta.error}>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
				) : null}
		</TextInputInner>
	);
};

const Editor = ({item,saveHandler}) =>
	<div>
		<FriendList/>
	</div>




export default Editor