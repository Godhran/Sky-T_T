import React from "react";
import useData from "../../hooks/hooks.data";
import scss from "../../styles/scss/style.scss";

const SelectContent = () => {
    const {
        contentData,
        selectedMovie,
        setSelectedMovie,
        clearSelectedMovie
    } = useData();

    if (contentData.length > 0) {
        if (selectedMovie.name) {
            return (
                <div className={'col-12 d-flex align-items-center px-3 px-md-5 mx-auto'}>
                    <h1 className={'py-3 white-text my-0'} style={{marginRight: 25}}>Clear</h1>
                    <div className={'clear-button'} onClick={clearSelectedMovie}>
                        <span>X</span>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={'col-12 d-flex align-items-center px-3 px-md-5 mx-auto'}>
                    <h1 className={'py-3 white-text my-0'} style={{marginRight: 25}}>Select</h1>
                    <div className="dropdown">
                        <a className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Content
                        </a>

                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            {contentData.map(entry =>
                                <p key={entry.name} className="dropdown-item p-1 m-0"
                                   onClick={() => setSelectedMovie(entry.name)}>{entry.name}</p>
                            )}
                        </div>
                    </div>
                </div>
            )
        }
    }else{
        return(
            <div className={'col-12 align-items-center px-3 px-md-5 mx-auto'}>
                <h1 className={'py-3 white-text my-0'} style={{marginRight: 25}}>Loading...</h1>
                <div className={'mx-auto'} style={{maxWidth:200}}>
                    <svg width="100%" viewBox="0 0 298 508" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.990005 206.97C1.00172 209.88 3.36499 212.236 6.27119 212.236H6.28291C9.20481 212.224 11.5641 209.857 11.5563 206.939L11.4001 151.81C12.9274 152.696 51.1341 174.908 48.7521 173.525C48.7677 197.087 48.6974 88.1657 48.8966 403.975L12.0486 382.506L11.7166 267.366C11.7048 264.455 9.34156 262.1 6.43536 262.1H6.42365C3.50174 262.112 1.14245 264.479 1.15025 267.397L1.4901 385.557C1.50182 387.428 2.49009 389.162 4.11119 390.108L51.5452 417.753C53.2054 418.718 55.2288 418.694 56.8382 417.768C56.9046 417.733 56.928 417.655 56.9905 417.616L134.034 373.288C153.202 384.374 151.257 383.296 151.386 383.37C157.565 386.925 164.511 388.706 171.964 388.815L171.96 389.636C169.87 390.39 167.85 391.249 166.046 392.304C158.686 396.597 154.636 402.589 154.569 409.187C154.569 409.237 154.541 409.28 154.541 409.327L153.924 484.413C153.912 491.167 158.072 497.292 165.647 501.667C179.315 509.55 200.686 509.597 214.37 501.656C221.788 497.339 225.886 491.285 225.897 484.64C226.17 451.484 226.53 406.843 226.526 409.589C226.538 402.917 222.252 396.612 214.796 392.292C212.835 391.159 210.651 390.249 208.343 389.432L208.425 377.655C236.859 360.788 261.366 327.659 273.359 293.253L294.543 281.093C296.183 280.148 297.207 278.394 297.195 276.495C297.121 251.515 297.461 366.487 296.472 33.5455C296.465 32.0221 294.898 29.608 293.84 28.9947C292.472 28.2017 243.145 -0.470305 245.891 1.1237C244.27 0.174475 242.238 0.174476 240.598 1.11198L3.44768 138.042C1.79928 138.995 0.807068 140.753 0.807068 142.612C0.807068 142.616 0.810974 142.62 0.810974 142.624C0.810974 142.628 0.807068 142.632 0.807068 142.636L0.990005 206.97ZM286.08 92.85C-24.46 272.05 82.65 210.24 59.48 223.62L59.3355 173.53L285.935 42.71L286.08 92.85ZM179.49 221.61C179.42 221.676 179.4 221.766 179.334 221.833C149.389 250.063 127.686 294.911 127.783 332.933C127.806 340.722 128.97 350.578 132.154 359.261C132.248 359.522 132.279 359.839 132.376 360.097L127.97 357.546C117.579 351.448 111.353 339.116 110.056 322.519C106.654 278.121 138.56 220.549 178.326 197.519C189.92 190.851 204.342 186.113 217.209 189.796C222.795 191.398 229.303 195.636 228.244 195.034C210.346 197.804 192.861 209.182 179.49 221.616L179.49 221.61ZM197.838 383.11L197.705 404.794C197.662 404.896 197.365 405.263 196.674 405.673C193.166 407.63 187.045 407.63 183.643 405.716C182.838 405.247 182.549 404.845 182.479 404.845C182.479 404.845 182.467 404.849 182.467 404.857L182.569 393.529C182.569 393.454 182.526 393.392 182.522 393.318L182.549 387.896C183.584 387.7 184.647 387.353 185.69 387.103C189.666 386.146 193.705 384.9 197.838 383.111L197.838 383.11ZM215.338 484.59C215.326 487.313 213.049 490.207 209.065 492.524C198.756 498.492 181.307 498.504 170.94 492.512C166.842 490.149 164.49 487.203 164.502 484.465L164.986 425.824C178.06 434.324 200.627 434.941 214.998 426.597C215.276 426.433 215.545 426.265 215.823 426.101L215.338 484.59ZM215.955 409.524V409.61C215.908 412.04 213.975 414.583 210.729 416.747C210.389 416.969 210.108 417.211 209.733 417.426C209.721 417.43 209.721 417.43 209.721 417.438C199.307 423.45 181.838 423.442 171.584 417.438C167.478 415.059 165.115 412.114 165.115 409.348C165.115 406.641 167.396 403.751 171.377 401.43C171.549 401.325 171.728 401.223 171.912 401.122L171.892 404.891C171.892 408.833 174.236 412.461 178.385 414.879C186.197 419.282 198.573 418.465 204.596 412.872C206.939 410.696 208.236 407.95 208.236 405.04L208.279 400.774C208.693 400.985 209.103 401.208 209.506 401.434C213.592 403.805 215.928 406.751 215.955 409.524L215.955 409.524ZM202.131 369.153C201.627 369.442 201.139 369.657 200.639 369.934C200.635 369.938 200.631 369.934 200.623 369.938C187.006 377.446 170.209 382 156.67 374.208C156.627 374.18 156.604 374.137 156.561 374.114L156.499 374.071C144.87 367.321 138.433 352.712 138.382 332.915C138.28 297.477 158.6 255.614 186.596 229.405C186.624 229.381 186.663 229.374 186.69 229.346C204.167 213.084 231.62 197.284 252.221 209.01C265.983 216.846 270.51 234.014 270.662 249.979C270.662 250.132 270.682 250.268 270.682 250.421C270.682 262.144 268.401 275.112 264.088 287.925C264.072 287.972 264.1 288.015 264.084 288.061C253.115 321.139 229.525 353.331 202.131 369.151L202.131 369.153ZM277.764 278.548C277.792 278.431 277.799 278.314 277.827 278.196C278.85 273.88 279.592 269.591 280.159 265.337C280.264 264.556 280.35 263.791 280.44 263.017C280.924 258.759 281.26 254.529 281.249 250.4V250.396V250.392C281.249 250.295 281.237 250.205 281.233 250.111C281.163 238.232 279.022 227.83 274.995 219.318C274.987 219.306 274.979 219.295 274.975 219.279C270.987 210.857 264.834 204.189 257.948 200.138C248.956 194.888 227.858 182.576 229.214 183.368C213.952 174.575 194.007 176.341 173.073 188.341C130.12 213.173 96.2761 274.927 99.4991 322.381C100.87 343.026 108.925 358.674 122.675 366.721L123.472 367.182L59.4919 403.994C59.4568 173.634 59.4685 253.084 59.4685 235.894C82.6565 222.511 -24.5085 284.359 286.149 105.074L286.633 273.464L277.764 278.548ZM243.241 11.798L280.663 33.548L54.0532 164.378C52.9829 163.757 15.5612 142.011 16.6312 142.636L243.241 11.798Z"
                            fill={scss.green}/>
                        <path
                            d="M6.38999 252.88C9.31189 252.868 11.6712 250.501 11.6634 247.583L11.6009 225.903C11.5892 222.993 9.22589 220.637 6.31969 220.637H6.30797C3.38607 220.649 1.02677 223.016 1.03457 225.934L1.09707 247.614C1.10878 250.525 3.47207 252.88 6.37827 252.88H6.38999Z"
                            fill={scss.green}/>
                        <path
                            d="M226.84 120.85C234.414 116.479 240.324 106.245 240.297 97.541C240.254 86.572 230.988 81.283 221.488 86.779C213.902 91.1579 207.98 101.412 207.992 110.119C208.031 121.076 217.375 126.318 226.84 120.849V120.85ZM226.77 95.932C228.277 95.0687 229.102 95.1312 229.184 95.1585C229.297 95.2523 229.731 95.9359 229.731 97.5726C229.742 102.577 225.922 109.182 221.559 111.698C220.063 112.569 219.227 112.487 219.102 112.455C219 112.373 218.555 111.698 218.555 110.092C218.543 105.084 222.383 98.4632 226.77 95.9322V95.932Z"
                            fill={scss.lime}/>
                        <path
                            d="M186.61 144.06C194.184 139.689 200.094 129.455 200.067 120.751C200.024 109.774 190.766 104.497 181.266 109.989C173.672 114.368 167.739 124.622 167.77 133.329C167.813 144.267 177.137 149.536 186.61 144.059V144.06ZM186.548 119.142C187.712 118.466 188.489 118.349 188.798 118.349C188.88 118.349 188.93 118.361 188.954 118.365C189.067 118.458 189.501 119.15 189.501 120.783C189.512 125.787 185.692 132.392 181.329 134.908C179.813 135.787 178.997 135.708 178.883 135.665C178.77 135.583 178.337 134.908 178.337 133.298C178.325 128.29 182.153 121.673 186.547 119.142L186.548 119.142Z"
                            fill={scss.lime}/>
                        <path
                            d="M267.03 97.64C274.624 93.2533 280.546 83.003 280.514 74.312C280.491 63.339 271.17 58.078 261.674 63.57C254.08 67.9606 248.147 78.211 248.178 86.91C248.221 97.914 257.6 103.09 267.03 97.64ZM266.956 72.718C268.464 71.8391 269.319 71.9016 269.413 71.9446C269.526 72.0383 269.948 72.7063 269.948 74.3352C269.96 79.2532 266.05 85.9992 261.745 88.4872C260.249 89.3544 259.413 89.2723 259.288 89.245C259.186 89.1629 258.741 88.4872 258.741 86.8778C258.733 81.8739 262.561 75.2568 266.956 72.7178L266.956 72.718Z"
                            fill={scss.lime}/>
                        <path
                            d="M72.08 192.55C73.5409 195.081 76.7675 195.944 79.3027 194.491L158.248 148.983C160.775 147.53 161.642 144.3 160.189 141.772C158.724 139.241 155.494 138.378 152.966 139.831L74.0214 185.339C71.4902 186.792 70.623 190.023 72.08 192.55Z"
                            fill={scss.white}/>
                        <path
                            d="M208.51 223.92C175.397 243.049 147.53 291.326 147.651 329.32C147.651 364.738 170.44 376.726 200.491 359.328C233.604 340.234 261.483 291.992 261.35 253.988C261.35 217.875 237.784 206.984 208.51 223.926V223.92ZM195.198 350.17C180.194 358.858 167.987 359.096 162.335 349.057C161.812 347.994 161.292 346.955 161.819 348.014C159.62 342.877 158.218 337.338 158.218 329.295C158.116 294.6 183.562 250.533 213.804 233.061C235.855 220.284 250.784 226.049 250.784 253.987V254.002C250.897 288.693 225.452 332.732 195.198 350.17L195.198 350.17Z"
                            fill={scss.white}/>
                        <path
                            d="M227.4 272.32L193.627 267.847C190.498 267.437 187.654 269.855 187.654 273.101L187.787 320.886C187.799 323.816 190.182 326.152 193.068 326.152C194.666 326.152 196.217 325.425 197.236 324.109L230.873 280.797C232.037 279.301 232.307 277.305 231.596 275.551C230.881 273.801 229.28 272.57 227.401 272.32L227.4 272.32ZM198.314 305.511L198.244 279.116L216.889 281.589L198.314 305.511Z"
                            fill={scss.white}/>
                    </svg>
                </div>
            </div>
        )
    }
}

export default SelectContent;