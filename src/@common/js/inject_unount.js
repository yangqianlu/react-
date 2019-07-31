import React from 'react';
function inject_unount(WrappedComponent) {
    return class WrappingComPonent extends React.Component {
        componentWillUnmount() {
            this.curent && (this.curent.setState = (sate, callback) => {
                return
            })
        }
        proc(wrappedComponentInstance) {
            this.curent = wrappedComponentInstance;

        }
        render() {
            const props = Object.assign({}, this.props)
            // const props = Object.assign({}, this.props, { ref: this.proc.bind(this) })

            return (<WrappedComponent {...props} />)
        }
    }
}
export default inject_unount;