export default function Home() {
  return (
    <main className="m-auto px-3">
      <div className="w-full h-full flex flex-col items-center ">
        <div className="w-56 lg:w-80 xl:w-96 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            className="w-full h-auto max-w-full"
            viewBox="0 0 350 350"
          >
            <defs>
              <clipPath id="clip">
                <circle cx="175" cy="175" r="157" />
              </clipPath>
            </defs>
            <circle cx="175" cy="175" r="170" fill="#2314a1">
              <animate
                attributeName="r"
                calcMode="spline"
                keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                values="170;175;170"
                dur="5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="175" cy="175" r="157" fill="#4294fe" />
            <g clipPath="url(#clip)">
              <g>
                <g id="land" fill="#43d8aa">
                  <path d="M14 101v12a6 6 0 0 1 6 6 6 6 0 0 1-6 6v12h40v-12a6 6 0 0 1-6-6 6 6 0 0 1 6-6v-12H14zm75 177v8a7.5 7.5 0 0 1 7.5 7.5A7.5 7.5 0 0 1 89 301v9h32v-9a7.5 7.5 0 0 1-7.5-7.5 7.5 7.5 0 0 1 7.5-7.5v-8z" />
                  <rect y="9" x="197" width="52" height="30" rx="15" ry="15" />
                  <rect
                    y="57"
                    x="-34"
                    width="150"
                    height="56"
                    rx="28"
                    ry="28"
                  />
                  <rect y="81" x="176" width="65" height="30" ry="15" rx="15" />
                  <rect
                    y="125"
                    x="-3"
                    width="82"
                    height="39"
                    ry="19.5"
                    rx="19.5"
                  />
                  <rect
                    y="139"
                    x="189"
                    width="195"
                    height="64"
                    rx="32"
                    ry="32"
                  />
                  <rect
                    y="218"
                    x="250"
                    width="100"
                    height="40"
                    rx="20"
                    ry="20"
                  />
                  <rect
                    y="230"
                    x="-17"
                    width="180"
                    height="56"
                    ry="28"
                    rx="28"
                  />
                  <rect
                    y="301"
                    x="56"
                    width="104"
                    height="30"
                    rx="15"
                    ry="15"
                  />
                </g>
                <use transform="translate(400 0)" href="#land" />
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  from="0 0"
                  to="-400 0"
                  dur="15s"
                  repeatCount="indefinite"
                />
              </g>
              <g>
                <g id="clouds" fill="#e6ebfc">
                  <path d="M242 87v6.03a3 3 0 0 1 .38-.03 3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-.38-.03V105h18v-6a3 3 0 0 1-3-3 3 3 0 0 1 3-3v-6zm53-2v4a5 5 0 0 1 0 10v4h30v-4a5 5 0 0 1 0-10v-4h-30zM48 209v6a4.5 4.5 0 1 1 0 9v3h29v-3a4.5 4.5 0 1 1 0-9v-6zM81 65v3a3.5 3.5 0 1 1 0 7v2h16v-2a3.5 3.5 0 1 1 0-7v-3zm18 181v4a5 5 0 0 1 0 10v4h30v-4a5 5 0 0 1 0-10v-4z" />
                  <rect y="50" x="64" width="53" height="18" rx="9" ry="9" />
                  <rect y="53" x="269" width="80" height="36" rx="18" ry="18" />
                  <rect y="75" x="0" width="112" height="22" rx="11" ry="11" />
                  <rect y="83" x="236" width="32" height="10" rx="5" ry="5" />
                  <rect
                    y="99"
                    x="227"
                    width="112"
                    height="24"
                    rx="12"
                    ry="12"
                  />
                  <rect y="102" x="146" width="36" height="16" rx="8" ry="8" />
                  <rect
                    y="172"
                    x="119"
                    width="62"
                    height="30"
                    rx="15"
                    ry="15"
                  />
                  <rect y="197" x="0" width="90" height="18" rx="9" ry="9" />
                  <rect y="293" x="219" width="30" height="16" rx="8" ry="8" />
                  <rect
                    y="224"
                    x="31"
                    width="118"
                    height="26"
                    rx="13"
                    ry="13"
                  />
                  <rect y="260" x="77" width="77" height="36" rx="18" ry="18" />
                  <rect
                    y="264"
                    x="228"
                    width="44"
                    height="22"
                    rx="11"
                    ry="11"
                  />
                </g>
                <use transform="translate(400 0)" href="#clouds" />
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  from="0 0"
                  to="-400 0"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </g>
            </g>
          </svg>
        </div>

        <h1 className="text-center mt-5 text-3xl font-semibold lg:text-4xl xl:text-5xl">
          Hey there!
        </h1>
        <p className="text-center mt-5 pb-5 text-xl opacity-90 font-normal px-4 lg:text-2xl  xl:text-3xl">
          Curious about the weather in your city? Find out with a quick search!
        </p>
      </div>
    </main>
  );
}
