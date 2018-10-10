import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
        marginLeft: theme.spacing.unit * 2
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    textFieldMultiLine: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2,
      },
    errorText: {
        backgroundColor: '#FFEBEE',
        color: '#B71C1C',
        padding: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
        whiteSpace: 'pre',
    }
})

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ModalCreatePost extends Component {
    state = {
        txtTitle: '',
        cboCategory: '',
        txtPostText: '',
        error: ''
    }

    handleClose = () => {
        this.setState({
            txtTitle: '',
            cboCategory: '',
            txtPostText: '',
            error: ''
        })

        this.props.closeModal()
    }

    handleChangeTitle = (e) => {
        this.setState({ txtTitle: e.target.value })
    }

    handleChangeCategory = (e) => {
        this.setState({ cboCategory: e.target.value })
    }

    handleChangePostText = (e) => {
        this.setState({ txtPostText: e.target.value })
    }

    submitData = () => {
        const { txtTitle, cboCategory, txtPostText } = this.state
        let errorText = ''

        if (txtTitle.length === 0) {
            errorText += "Field 'Title' is empty, please insert some text.\n"
        }

        if (cboCategory.length === 0) {
            errorText += "Field 'Category' isn't select, please select a value to continue.\n"
        }

        if (txtPostText.length === 0) {
            errorText += "Field 'Post' is empty, please insert some text.\n"
        }

        if (errorText.length > 0) {
            this.setState({ error: errorText })
            return false
        }

        const { valueFilter, sortFilter, authorLogged, savePost, errorSave } = this.props
        const filterColumn = valueFilter === 'dateOfCreation' ? 'timestamp' : 'voteScore'
        
        savePost(authorLogged, txtTitle, cboCategory, txtPostText, sortFilter, filterColumn)
        
        //Quando não existe erro para exibir
        if (errorSave !== undefined && errorSave.length === 0) {
            this.handleClose()
        }
    }
    
    render() {
        const { classes, openModal, errorSave, dataCategory } = this.props;
        const showError = this.state.error.length > 0 ? this.state.error : errorSave

        return (
            <div>
                <Dialog
                fullScreen
                open={openModal}
                onClose={this.handleClose}
                TransitionComponent={Transition}
                >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                    <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="body2" color="inherit" className={classes.flex}>
                        CREATE A POST
                    </Typography>
                    <Button color="inherit" onClick={this.submitData}>
                        CREATE
                    </Button>
                    </Toolbar>
                </AppBar>
                <Grid container
                        justify="center"
                        direction="row"
                        alignItems="flex-start"
                        className={classes.root}>                
                    <Grid item xs={12} sm={10}>
                        {showError && (
                            <Typography component="p" align="center" variant="body2" className={classes.errorText}>
                            {`${showError}`}</Typography>
                        )}
                        <form className={classes.container} autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                            <TextField
                            label="Title"
                            className={classes.textField}
                            value={this.state.txtTitle}
                            onChange={this.handleChangeTitle}
                            margin="normal"
                            />
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink htmlFor="category-label-placeholder">Category</InputLabel>
                                <Select
                                    value={this.state.cboCategory}
                                    onChange={this.handleChangeCategory}
                                    input={<Input name="category" id="category-label-placeholder" />}
                                    displayEmpty
                                    name="category"
                                    className={classes.selectEmpty}>
                                    <MenuItem value=""><em>Select...</em></MenuItem>
                                    {dataCategory && dataCategory.map(v => {
                                        return <MenuItem key={v.name} value={v.name}>{v.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Post"
                                multiline
                                rows={15}
                                value={this.state.txtPostText}
                                onChange={this.handleChangePostText}
                                className={classes.textFieldMultiLine}
                                margin="normal"/>
                        </form>
                    </Grid>
                </Grid>
                </Dialog>
            </div>
        )
    }
}

ModalCreatePost.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    const { openModal, error } = state.createPostModal
    const { valueFilter, sortFilter } = state.filters
    const { authorLogged } = state.login
    const { categories } = state.categories

    return {
        openModal,
        valueFilter, 
        sortFilter,
        authorLogged,
        errorSave: error,
        dataCategory: categories,
    }
}

const mapDispatchToProps = dispatch => ({
    closeModal: _=> dispatch({ type: 'CLOSE_MODAL_CREATE_POST' }),
    savePost: (author, title, category, postText, sortFilter, filterColumn) => dispatch({ 
        type: 'CREATE_POST', 
        payload: {
            author,
            title, 
            category, 
            postText,
            sortFilter, 
            filterColumn
        }
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ModalCreatePost));