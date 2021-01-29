import React from "react";
import { ModalWrapper } from ".";
import { GeneratedForm, LogForm } from "./ReportModal";

const WithReportsModal = (Component) => {
  class ReportsModal extends React.Component {
    constructor() {
      super();
      this.activeClassNames =
        "p-1 bg-blue-400 text-white font-bold text-md border border-white ";
      this.disabledClassNames =
        "p-2 bg-blue-200 text-white font-normal text-md";
      this.state = {
        isModalOpen: false,
        mountedForm: "log", // ['log', 'generate', 'export']
      };
    }

    componentWillUnmount() {
      this.setState({ ...this.state, isModalOpen: false });
    }

    openModal = (formName) => {
      this.setState({
        ...this.state,
        isModalOpen: true,
        mountedForm: formName,
      });
    };

    closeModal = () => {
      this.setState({ ...this.state, isModalOpen: false });
    };

    changeMountedForm = (formName) => {
      this.setState({ ...this.state, mountedForm: formName });
    };

    render() {
      return (
        <>
          <Component
            {...this.props}
            openModal={this.openModal}
            closeModal={this.closeModal}
          />
          <ModalWrapper
            title="Reports"
            onRequestClosefn={this.closeModal}
            modalOpenState={this.state.isModalOpen}
            closeModal={this.closeModal}
          >
            <div className=" flex justify-center pt-4">
              <div className="flex justify-between">
                <button
                  className={
                    this.state.mountedForm === "log"
                      ? this.activeClassNames
                      : this.disabledClassNames
                  }
                  onClick={() => this.changeMountedForm("log")}
                >
                  Log Resumption Times
                </button>
                <button
                  className={
                    this.state.mountedForm === "generate"
                      ? this.activeClassNames
                      : this.disabledClassNames
                  }
                  onClick={() => this.changeMountedForm("generate")}
                >
                  Generate Report
                </button>
              </div>
            </div>

            <div className="flex justify-center items-center mt-20">
              {this.state.mountedForm === "log" && <LogForm />}
              {this.state.mountedForm === "generate" && <GeneratedForm />}
            </div>
          </ModalWrapper>
        </>
      );
    }
  }

  return ReportsModal;
};

export default WithReportsModal;
