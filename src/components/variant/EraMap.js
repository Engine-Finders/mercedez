// export default function EraMap({ data }) {
//   if (!data) return null;

//   return (
//     <section style={{ paddingBottom: 8 }}>
//       <h2>{data.title}</h2>

//       <table border="1" cellPadding="4" cellSpacing="0">
//         <thead>
//           <tr>
//             {data.columns?.map((col) => (
//               <th key={col}>{col}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.rows?.map((row) => (
//             <tr key={row.generation}>
//               <td>{row.generation}</td>
//               <td>{row.years}</td>
//               <td>{row.engineCode}</td>
//               <td>{row.reliability}</td>
//               <td>{row.reconCost}</td>
//               <td>{row.eraNote}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {data.sourceNote && <p>{data.sourceNote}</p>}
//       {data.dataNote && <p>{data.dataNote}</p>}
//       <hr />
//     </section>
//   );
// }


export default function EraMap({ data }) {
  if (!data) return null;

  return (
    <section style={{ paddingBottom: 8 }}>
      <h2 dangerouslySetInnerHTML={{ __html: data.title }} />

      <table border="1" cellPadding="4" cellSpacing="0">
        <thead>
          <tr>
            {data.columns?.map((col) => (
              <th key={col} dangerouslySetInnerHTML={{ __html: col }} />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows?.map((row) => (
            <tr key={row.generation}>
              <td dangerouslySetInnerHTML={{ __html: row.generation }} />
              <td dangerouslySetInnerHTML={{ __html: row.years }} />
              <td dangerouslySetInnerHTML={{ __html: row.engineCode }} />
              <td dangerouslySetInnerHTML={{ __html: row.reliability }} />
              <td dangerouslySetInnerHTML={{ __html: row.reconCost }} />
              <td dangerouslySetInnerHTML={{ __html: row.eraNote }} />
            </tr>
          ))}
        </tbody>
      </table>

      {data.sourceNote && (
        <div dangerouslySetInnerHTML={{ __html: data.sourceNote }} />
      )}
      {data.dataNote && (
        <div dangerouslySetInnerHTML={{ __html: data.dataNote }} />
      )}
      <hr />
    </section>
  );
}