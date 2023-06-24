// import styles from './bluefish.module.css';
import {
  ScenegraphContext,
  ScenegraphNode,
  Transform,
  createScenegraph,
  ParentIDContext,
} from "./scenegraph";
import { ParentProps, createUniqueId } from "solid-js";

export type BluefishProps = ParentProps<{
  width: number;
  height: number;
  id?: string;
}>;

declare global {
  interface Window {
    bluefish?: { [key: string]: { [key: string]: ScenegraphNode } };
  }
}

export function Bluefish(props: BluefishProps) {
  // const bboxStore = useMemo(() => observable.map(), []);
  // const bboxStore = useMemo(() => createScenegraph(), []);
  // const bboxStore = createScenegraph();
  const scenegraphContext = createScenegraph();
  const { scenegraph, createNode } = scenegraphContext;

  // const autoGenId = useId();
  const autoGenId = createUniqueId();
  const id = props.id ?? autoGenId;
  // const wroteToWindow = useRef(false);

  // useEffect(() => {
  //   if (window.bluefish === undefined) {
  //     window.bluefish = {};
  //   }

  //   if (window.bluefish[id] !== undefined) {
  //     console.error(`Duplicate id ${id}. Not writing to window.bluefish`);
  //   } else {
  //     window.bluefish[id] = scenegraph;
  //     wroteToWindow.current = true;
  //   }

  //   return () => {
  //     if (window.bluefish !== undefined && wroteToWindow.current) {
  //       delete window.bluefish[id];
  //       wroteToWindow.current = false;
  //     }
  //   };
  // });

  if (scenegraph[id] === undefined) {
    createNode(id, null);
  }

  // const layout = useCallback(
  //   (childIds: Id[]) => {
  //     for (const childId of childIds) {
  //       getBBox(childId);
  //     }

  //     return {
  //       bbox: {
  //         left: 0,
  //         top: 0,
  //         width: props.width,
  //         height: props.height,
  //       },
  //       transform: {
  //         translate: {
  //           x: 0,
  //           y: 0,
  //         },
  //       },
  //     };
  //   },
  //   [getBBox, props.height, props.width]
  // );

  // const paint = useCallback(
  //   ({
  //     bbox,
  //     transform,
  //     children,
  //   }: PropsWithChildren<{ bbox: BBox; transform: Transform }>) => {
  //     return (
  //       <svg
  //         width={props.width}
  //         height={props.height}
  //         viewBox={`0 0 ${props.width} ${props.height}`}
  //       >
  //         {props.children}
  //       </svg>
  //     );
  //   },
  //   [props.children, props.height, props.width]
  // );

  return (
    <>
      <ScenegraphContext.Provider value={scenegraphContext}>
        <ParentIDContext.Provider value={id}>
          <svg
            width={props.width}
            height={props.height}
            viewBox={`0 0 ${props.width} ${props.height}`}
          >
            {props.children}
          </svg>
          {/* <Layout id={id} layout={layout} paint={paint}>
          {props.children}
        </Layout> */}
        </ParentIDContext.Provider>
      </ScenegraphContext.Provider>
      <pre>{JSON.stringify(scenegraph, null, 2)}</pre>
    </>
  );
}

export default Bluefish;
