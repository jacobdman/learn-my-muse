import React from 'react'

export default function Svg (Cn0, Cn5, Cn4, Cn3, Cn2, Cn1) {

    var name = Cn0

    function handleClick (val, num) {
        if (val === 'star') {
            console.log(num)
        }
    }

    return (
        <div className="Parent" >
            <svg className={name + ' ' + Cn1} viewBox="481.4184117647058 784.6257478129036 129.9260000000001 198.9999999999999" width="125.93" height="195" onClick={() => {handleClick('star', 5)}} >   
                <g>
                    <g>
                        <path d="M483.35 957.36C487.12 977.57 519.77 996.36 546.88 960.05C550.83 920.82 556 881.4 559.95 842.17C601.63 884.63 588.32 910.32 579.7 939.9C597.41 931.46 625.16 894.22 594.85 841.69C580.5 818.42 581.85 834.85 567.95 788.43C563.05 787.5 558.15 786.56 553.26 785.63C547.42 833.46 542.74 877.36 536.9 925.2C500.05 900.83 477.46 925.86 483.35 957.36Z" id="b1ZYvkXzeB"></path>
                    </g>
                </g>
            </svg>
            <svg className={name + ' ' + Cn2} viewBox="481.4184117647058 784.6257478129036 129.9260000000001 198.9999999999999" width="125.93" height="195" onClick={() => {handleClick('star', 4)}} >   
                <g>
                    <g>
                        <path d="M483.35 957.36C487.12 977.57 519.77 996.36 546.88 960.05C550.83 920.82 556 881.4 559.95 842.17C601.63 884.63 588.32 910.32 579.7 939.9C597.41 931.46 625.16 894.22 594.85 841.69C580.5 818.42 581.85 834.85 567.95 788.43C563.05 787.5 558.15 786.56 553.26 785.63C547.42 833.46 542.74 877.36 536.9 925.2C500.05 900.83 477.46 925.86 483.35 957.36Z" id="b1ZYvkXzeB"></path>
                    </g>
                </g>
            </svg>
            <svg className={name + ' ' + Cn3} viewBox="481.4184117647058 784.6257478129036 129.9260000000001 198.9999999999999" width="125.93" height="195" onClick={() => {handleClick('star', 3)}} >   
                <g>
                    <g>
                        <path d="M483.35 957.36C487.12 977.57 519.77 996.36 546.88 960.05C550.83 920.82 556 881.4 559.95 842.17C601.63 884.63 588.32 910.32 579.7 939.9C597.41 931.46 625.16 894.22 594.85 841.69C580.5 818.42 581.85 834.85 567.95 788.43C563.05 787.5 558.15 786.56 553.26 785.63C547.42 833.46 542.74 877.36 536.9 925.2C500.05 900.83 477.46 925.86 483.35 957.36Z" id="b1ZYvkXzeB"></path>
                    </g>
                </g>
            </svg>
            <svg className={name + ' ' + Cn4} viewBox="481.4184117647058 784.6257478129036 129.9260000000001 198.9999999999999" width="125.93" height="195" onClick={() => {handleClick('star', 2)}} >   
                <g>
                    <g>
                        <path d="M483.35 957.36C487.12 977.57 519.77 996.36 546.88 960.05C550.83 920.82 556 881.4 559.95 842.17C601.63 884.63 588.32 910.32 579.7 939.9C597.41 931.46 625.16 894.22 594.85 841.69C580.5 818.42 581.85 834.85 567.95 788.43C563.05 787.5 558.15 786.56 553.26 785.63C547.42 833.46 542.74 877.36 536.9 925.2C500.05 900.83 477.46 925.86 483.35 957.36Z" id="b1ZYvkXzeB"></path>
                    </g>
                </g>
            </svg>
            <svg className={name + ' ' + Cn5} viewBox="481.4184117647058 784.6257478129036 129.9260000000001 198.9999999999999" width="125.93" height="195" onClick={() => {handleClick('star', 1)}} >   
                <g>
                    <g>
                        <path d="M483.35 957.36C487.12 977.57 519.77 996.36 546.88 960.05C550.83 920.82 556 881.4 559.95 842.17C601.63 884.63 588.32 910.32 579.7 939.9C597.41 931.46 625.16 894.22 594.85 841.69C580.5 818.42 581.85 834.85 567.95 788.43C563.05 787.5 558.15 786.56 553.26 785.63C547.42 833.46 542.74 877.36 536.9 925.2C500.05 900.83 477.46 925.86 483.35 957.36Z" id="b1ZYvkXzeB"></path>
                    </g>
                </g>
            </svg>
        </div>
    )
}