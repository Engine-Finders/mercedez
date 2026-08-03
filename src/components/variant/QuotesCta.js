// export default function QuotesCta({ data }) {
//   if (!data) return null;

//   return (
//     <section style={{ paddingBottom: 8 }}>
//       <h2>{data.headline}</h2>
//       {data.supportingLine && <p>{data.supportingLine}</p>}
//       {data.button && (
//         <p>
//           <a style='font-weight: bold;' href={data.button.href}>{data.button.label}</a>
//         </p>
//       )}
//       <hr />
//     </section>
//   );
// }


export default function QuotesCta({ data }) {
  if (!data) return null;

  return (
    <section style={{ paddingBottom: 8 }}>
      <h2 dangerouslySetInnerHTML={{ __html: data.headline }} />

      {data.supportingLine && (
        <div dangerouslySetInnerHTML={{ __html: data.supportingLine }} />
      )}

      {data.button && (
        <p>
          <a
            href={data.button.href}
            dangerouslySetInnerHTML={{ __html: data.button.label }}
          />
        </p>
      )}

      <hr />
    </section>
  );
}