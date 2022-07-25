import { Link } from "@prisma/client";
import React from "react";

export const LinkComponent: React.FC<{
  link: Link;
}> = ({ link }) => {
  return (
    <>
      <style jsx>
        {`
          /*! CSS Used from: Embedded */
          .pkAuV {
            position: relative;
          }
          .hBNyQA {
            position: relative;
            height: auto;
            border-radius: 14px;
          }
          .CczVW {
            padding: 0px;
            margin: 0px;
            line-height: 1.5;
            width: 100%;
            font-weight: 500;
            font-size: 14px;
          }
          .ldGKnQ {
            margin: 0px;
            border: none;
            font-family: inherit;
            font-weight: inherit;
            font-size: inherit;
            text-align: center;
            cursor: pointer;
            background: none;
            text-decoration: none;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: center;
            justify-content: center;
            height: auto;
            position: relative;
            padding: 16px 20px;
            width: 100%;
            appearance: none;
            box-sizing: border-box;
            vertical-align: middle;
          }
          .ldGKnQ:focus {
            outline: none;
          }
          .ldGKnQ:disabled {
            cursor: default;
            pointer-events: none;
          }
          div,
          p,
          a {
            margin: 0px;
            padding: 0px;
            border: 0px;
            font: inherit;
            vertical-align: baseline;
          }
          *,
          ::before,
          ::after {
            box-sizing: inherit;
          }
          .imjgnX {
            overflow-wrap: break-word;
            word-break: break-word;
            hyphens: auto;
            white-space: normal;
            background: none;
            color: inherit;
            transition: box-shadow 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s,
              border-color 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s,
              transform 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s,
              background-color 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s;
            min-height: 56px;
          }
          .eaMbDs {
            z-index: 0;
            overflow: hidden;
            margin-bottom: 16px;
            border: none;
            background-color: rgb(34, 34, 34);
            color: rgb(255, 255, 255);
            transition: transform 0.15s cubic-bezier(0, 0.2, 0.5, 3) 0s;
          }
          .eaMbDs:hover {
            transform: scale(1.02);
          }
          .rsIfq {
            position: relative;
            hyphens: none;
          }
        `}
      </style>
      <div id="240956708" className="sc-bdfBwQ pkAuV">
        <div
          data-testid="StyledContainer"
          className="sc-bdfBwQ StyledContainer__StyledLinkContainer-sc-1kae6sc-0 hBNyQA eaMbDs"
        >
          <a
            href={`https://${link.linkUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="LinkButton"
            aria-describedby="profile-opat-04 "
            className="sc-pFZIQ StyledButton-sc-686c3k-0 ldGKnQ imjgnX"
          >
            <p className="sc-hKgILt Button__StyledText-sc-uh5tyw-0 CczVW rsIfq">
              {link.text}
            </p>
          </a>
        </div>
      </div>
    </>
  );
};
