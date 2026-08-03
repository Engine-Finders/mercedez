// export default function ReplacementCosts({ data }) {
//   if (!data) return null;

//   return (
//     <section style={{ paddingBottom: 8 }}>
//       <h2>{data.h2}</h2>

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
//             <tr key={row.engineType}>
//               <td>{row.engineType}</td>
//               <td>{row.supplyOnly}</td>
//               <td>{row.fittedIndie}</td>
//               <td>{row.warranty}</td>
//               <td>{row.bestFor}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {data.figuresNote && <p>{data.figuresNote}</p>}
//       {data.labourEstimate && <p>{data.labourEstimate}</p>}
//       {data.cta && (
//         <p>
//           <a style='font-weight: bold;' href={data.cta.href}>{data.cta.label}</a>
//         </p>
//       )}
//       <hr />
//     </section>
//   );
// }

export default function ReplacementCosts({ data }) {
  if (!data) return null;

  return (
    <section style={{ paddingBottom: 8 }}>
      <h2 dangerouslySetInnerHTML={{ __html: data.h2 }} />

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
            <tr key={row.engineType}>
              <td dangerouslySetInnerHTML={{ __html: row.engineType }} />
              <td dangerouslySetInnerHTML={{ __html: row.supplyOnly }} />
              <td dangerouslySetInnerHTML={{ __html: row.fittedIndie }} />
              <td dangerouslySetInnerHTML={{ __html: row.warranty }} />
              <td dangerouslySetInnerHTML={{ __html: row.bestFor }} />
            </tr>
          ))}
        </tbody>
      </table>

      {data.figuresNote && (
        <div dangerouslySetInnerHTML={{ __html: data.figuresNote }} />
      )}
      {data.labourEstimate && (
        <div dangerouslySetInnerHTML={{ __html: data.labourEstimate }} />
      )}
      {data.cta && (
        <p>
          <a
            href={data.cta.href}
            dangerouslySetInnerHTML={{ __html: data.cta.label }}
          />
        </p>
      )}
      <hr />
    </section>
  );
}