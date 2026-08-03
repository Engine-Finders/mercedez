// export default function CommonProblems({ data }) {
//   if (!data) return null;

//   return (
//     <section style={{ paddingBottom: 8 }}>
//       <h2>Common Problems</h2>
//       {data.problems?.map((problem) => (
//         <div key={problem.id}>
//           <h3>
//             {problem.id}. {problem.title}
//           </h3>
//           {problem.symptoms && <p>Symptoms: {problem.symptoms}</p>}
//           {problem.typicalMileage && (
//             <p>Typical mileage: {problem.typicalMileage}</p>
//           )}
//           {problem.repairCost && <p>Repair cost: {problem.repairCost}</p>}
//           {problem.replacementCost && (
//             <p>Replacement cost: {problem.replacementCost}</p>
//           )}
//           {problem.urgency && (
//             <p>
//               Urgency: {problem.urgency.icon} {problem.urgency.label} —{" "}
//               {problem.urgency.text}
//             </p>
//           )}
//           {problem.recommendation && <p>{problem.recommendation}</p>}
//           {problem.failureLink && (
//             <p>
//               <a  href={problem.failureLink.href}>
//                 {problem.failureLink.label}
//               </a>
//             </p>
//           )}
//         </div>
//       ))}
//       <hr />
//     </section>
//   );
// }

export default function CommonProblems({ data }) {
  if (!data) return null;

  return (
    <section style={{ paddingBottom: 8 }}>
      <h2 dangerouslySetInnerHTML={{ __html: "Common Problems" }} />
      {data.problems?.map((problem) => (
        <div key={problem.id}>
          <h3>
            <span dangerouslySetInnerHTML={{ __html: `${problem.id}. ` }} />
            <span dangerouslySetInnerHTML={{ __html: problem.title }} />
          </h3>

          {problem.symptoms && (
            <p>
              <span
                dangerouslySetInnerHTML={{ __html: "Symptoms: " }}
              />
              <span
                dangerouslySetInnerHTML={{ __html: problem.symptoms }}
              />
            </p>
          )}

          {problem.typicalMileage && (
            <p>
              <span
                dangerouslySetInnerHTML={{ __html: "Typical mileage: " }}
              />
              <span
                dangerouslySetInnerHTML={{ __html: problem.typicalMileage }}
              />
            </p>
          )}

          {problem.repairCost && (
            <p>
              <span
                dangerouslySetInnerHTML={{ __html: "Repair cost: " }}
              />
              <span
                dangerouslySetInnerHTML={{ __html: problem.repairCost }}
              />
            </p>
          )}

          {problem.replacementCost && (
            <p>
              <span
                dangerouslySetInnerHTML={{ __html: "Replacement cost: " }}
              />
              <span
                dangerouslySetInnerHTML={{ __html: problem.replacementCost }}
              />
            </p>
          )}

          {problem.urgency && (
            <p>
              <span dangerouslySetInnerHTML={{ __html: "Urgency: " }} />
              <span
                dangerouslySetInnerHTML={{
                  __html: `${problem.urgency.icon} ${problem.urgency.label} — ${problem.urgency.text}`,
                }}
              />
            </p>
          )}

          {problem.recommendation && (
            <div
              dangerouslySetInnerHTML={{ __html: problem.recommendation }}
            />
          )}

          {problem.failureLink && (
            <p>
              <a
                href={problem.failureLink.href}
                dangerouslySetInnerHTML={{
                  __html: problem.failureLink.label,
                }}
              />
            </p>
          )}
        </div>
      ))}
      <hr />
    </section>
  );
}